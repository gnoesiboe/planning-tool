import {
    getCurrentWeek,
    getCurrentYear,
    getNoOfWeeksInYear,
} from '../../../utility/dateTimeUtilities';
import { PlanningFilters } from '../hooks/useManagePlanning';

const defaultNoOfWeeksToShow = 10;

export function resolveInitialFilters(): PlanningFilters {
    const fromWeek = getCurrentWeek();
    const fromYear = getCurrentYear();

    const untilWeek =
        (getCurrentWeek() + defaultNoOfWeeksToShow) %
        getNoOfWeeksInYear(fromYear);
    const untilYear = untilWeek <= fromWeek ? fromYear + 1 : fromYear;

    return {
        from: {
            week: fromWeek,
            year: fromYear,
        },
        until: {
            week: untilWeek,
            year: untilYear,
        },
        teamIds: [],
    };
}
