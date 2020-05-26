import { NextApiRequest } from 'next';
import { PlanningItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';
import Joi from '@hapi/joi';
import {
    sendValidationErrorResponse,
    sendInternalServerErrorResponse,
} from '../../response/handler/errorResponseHandler';

const inputSchema = Joi.object({
    team_id: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
    ),
}).required();

type FiltersValues = {
    teamIds: string[];
};

const determineFilters = (request: NextApiRequest): FiltersValues => {
    const {
        value: { team_id },
        error,
    } = inputSchema.validate(request.query);

    if (error) {
        throw error;
    }

    const teamIds = team_id
        ? Array.isArray(team_id)
            ? team_id
            : [team_id]
        : [];

    return { teamIds };
};

const indexController: Controller = async (request, response) => {
    try {
        const { teamIds } = determineFilters(request);

        const planningItems = await findAllUpcoming(teamIds);

        const body: PlanningItemsResponseBody = { planningItems };

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
