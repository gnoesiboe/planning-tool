import Joi from '@hapi/joi';
import {
    getCurrentYear,
    getCurrentWeek,
    getNoOfWeeksInYear,
} from '../../../utility/dateTimeUtilities';

const defaultNoOfWeeksToShow = 10;

/**
 * Generate a new input schema every request to make sure that
 * the current year and week are used for validation.
 */
export function createPlanningItemFilteringSchema() {
    const currentWeek = getCurrentWeek();
    const currentYear = getCurrentYear();

    const weekSchema = Joi.number().min(1).max(53);
    const yearSchema = Joi.number()
        .min(currentYear - 1)
        .max(currentYear + 2);

    return Joi.object({
        team_id: Joi.alternatives().try(
            Joi.array().items(Joi.string()),
            Joi.string()
        ),

        // from
        week_from: weekSchema.default(currentWeek),

        year_from: yearSchema.default(currentYear),

        // until
        week_until: weekSchema.default(({ week_from, year_from }) => {
            const weekFrom = week_from || currentWeek;
            const yearFrom = year_from || currentYear;

            return (
                (weekFrom + defaultNoOfWeeksToShow) %
                getNoOfWeeksInYear(yearFrom)
            );
        }),

        year_until: yearSchema.default(
            ({ week_from, year_from, week_until }) => {
                const fromWeek = week_from || currentWeek;
                const fromYear = year_from || currentYear;
                const untilWeek = week_until || currentWeek;

                if (untilWeek <= fromWeek) {
                    return fromYear + 1;
                }

                return fromYear;
            }
        ),
    }).required();
}
