import { NextApiRequest } from 'next';
import { PlanningItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';
import Joi from '@hapi/joi';
import {
    sendValidationErrorResponse,
    sendInternalServerErrorResponse,
} from '../../response/handler/errorResponseHandler';
import { WeekYearPair } from '../../../utility/types';
import { createPlanningItemFilteringSchema as createValidationSchema } from '../../validation/factory/planningItemValidationSchemaFactory';

export type FiltersValues = {
    teamIds: string[];
    from: WeekYearPair;
    until: WeekYearPair;
};

const determineFilters = (request: NextApiRequest): FiltersValues => {
    const {
        value: { team_id, week_from, year_from, week_until, year_until },
        error,
    } = createValidationSchema().validate(request.query);

    if (error) {
        throw error;
    }

    const teamIds = team_id
        ? Array.isArray(team_id)
            ? team_id
            : [team_id]
        : [];

    return {
        teamIds,
        from: {
            week: week_from,
            year: year_from,
        },
        until: {
            week: week_until,
            year: year_until,
        },
    };
};

const indexController: Controller = async (request, response) => {
    try {
        const filters = determineFilters(request);

        const { teamIds, from, until } = filters;

        const planningItems = await findAllUpcoming(teamIds, from, until);

        const body: PlanningItemsResponseBody = { filters, planningItems };

        response.statusCode = 200;
        response.json(body);
    } catch (error) {
        if (Joi.isError(error)) {
            sendValidationErrorResponse(response, error.details);

            return;
        }

        sendInternalServerErrorResponse(
            response,
            'Something went wrong. See request log for details'
        );
    }
};

export default indexController;
