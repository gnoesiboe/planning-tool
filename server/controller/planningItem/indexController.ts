import { NextApiRequest } from 'next';
import { PlanningItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';
import Joi from '@hapi/joi';
import {
    sendValidationErrorResponse,
    sendInternalServerErrorResponse,
} from '../../response/handler/errorResponseHandler';
import {
    getCurrentWeek,
    getCurrentYear,
    getNoOfWeeksInYear,
} from '../../../utility/dateTimeUtilities';
import { WeekYearPair } from '../../../utility/types';

const defaultNoOfWeeksToShow = 10;

/**
 * Generated a new input schema every requet to make sure that
 * the current year and week are used for validation.
 */
const createInputSchema = () => {
    return Joi.object({
        team_id: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ),

        // from
        week_from: Joi.number()
            .default(() => getCurrentWeek())
            .min(1)
            .max(53),
        year_from: Joi.number()
            .default(() => getCurrentYear())
            .min(getCurrentWeek() - 1),

        // until
        week_until: Joi.number()
            .default(({ week_from, year_from }) => {
                const weekFrom = week_from || getCurrentWeek();
                const yearFrom = year_from || getCurrentYear();

                return (
                    (weekFrom + defaultNoOfWeeksToShow) %
                    getNoOfWeeksInYear(yearFrom)
                );
            })
            .min(1)
            .max(53),
        year_until: Joi.number()
            .default(({ week_from, year_from, week_until }) => {
                const fromWeek = week_from || getCurrentWeek();
                const fromYear = year_from || getCurrentYear();
                const untilWeek = week_until || getCurrentWeek();

                if (untilWeek <= fromWeek) {
                    return fromYear + 1;
                }

                return fromYear;
            })
            .min(getCurrentYear() - 1)
            .max(getCurrentYear() + 2),
    }).required();
};

export type FiltersValues = {
    teamIds: string[];
    from: WeekYearPair;
    until: WeekYearPair;
};

const determineFilters = (request: NextApiRequest): FiltersValues => {
    const {
        value: { team_id, week_from, year_from, week_until, year_until },
        error,
    } = createInputSchema().validate(request.query);

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
