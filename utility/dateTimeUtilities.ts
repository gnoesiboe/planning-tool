import { WeekYearPair } from './types.d';
import {
    getWeek,
    addWeeks,
    getYear,
    getISOWeeksInYear,
    getISOWeek,
    subMonths,
    setYear,
    setISOWeek,
    startOfWeek,
    endOfWeek,
    eachWeekOfInterval,
    format,
} from 'date-fns';
import { nl } from 'date-fns/locale';

export function getRangeOfWeekYearPairsFromDate(from: Date, add: number) {
    const out: Array<WeekYearPair> = [
        { week: getISOWeek(from), year: getYear(from) },
    ];

    let cursorDate = from;
    let counter = 1;

    while (counter < add) {
        cursorDate = addWeeks(cursorDate, 1);

        const nextWeek = getWeek(cursorDate, {
            locale: nl,
        });

        const nextYear = getYear(cursorDate);

        out.push({ week: nextWeek, year: nextYear });

        counter++;
    }

    return out;
}

export function subtractMonths(date: Date, amount: number): Date {
    return subMonths(date, amount);
}

export function createRangeOfWeekYearPairs(
    from: WeekYearPair,
    until: WeekYearPair
): Array<WeekYearPair> {
    const startDate = createDateFromWeekYearPair(from, 'start');
    const endDate = createDateFromWeekYearPair(until, 'start');

    const weeksInBetween = eachWeekOfInterval(
        { start: startDate, end: endDate },
        { locale: nl }
    );

    return weeksInBetween.map((date) => ({
        week: getISOWeek(date),
        year: getYear(date),
    }));
}

export function createDateFromWeekYearPair(
    pair: WeekYearPair,
    cursorInWeek: 'end' | 'start'
): Date {
    let date = new Date();

    date = setISOWeek(date, pair.week);
    date = setYear(date, pair.year);

    return cursorInWeek === 'end'
        ? endOfWeek(date, { locale: nl })
        : startOfWeek(date, { locale: nl });
}

export function getNoOfWeeksInYear(year: number) {
    let middleOfYear = new Date();
    middleOfYear.setFullYear(year);

    return getISOWeeksInYear(middleOfYear);
}

export function getCurrentYear(): number {
    return getYear(new Date());
}

export function getCurrentWeek(): number {
    return getWeek(new Date(), {
        locale: nl,
    });
}

export function getStartOfWeek(pair: WeekYearPair): Date {
    return createDateFromWeekYearPair(pair, 'start');
}

export function getEndOfWeek(pair: WeekYearPair): Date {
    return createDateFromWeekYearPair(pair, 'end');
}

export function formatShortDate(date: Date): string {
    return format(date, 'd MMM', {
        locale: nl,
    });
}
