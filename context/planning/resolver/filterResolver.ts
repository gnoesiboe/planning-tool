import { WeekYearPair } from '../../../utility/types';
import {
    getCurrentWeek,
    getCurrentYear,
    getNoOfWeeksInYear,
} from '../../../utility/dateTimeUtilities';

export type Filters = {
    from: WeekYearPair;
    until: WeekYearPair;
};

const defaultNoOfWeeksToShow = 10;

export function resolveInitialFilterValues(): Filters {
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
    };
}
