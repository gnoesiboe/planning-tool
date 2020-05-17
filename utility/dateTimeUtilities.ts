import { getWeek, addWeeks, getYear } from 'date-fns';
import { nl } from 'date-fns/locale';

export function getRangeOfWeeksWithYearsFromCurrent(
    add: number
): Array<[number, number]> {
    const now = new Date();
    const currentWeek = getWeek(now, {
        locale: nl,
    });
    const currentYear = getYear(now);

    const out: Array<[number, number]> = [[currentWeek, currentYear]];

    let cursorDate = now;
    let counter = 1;

    while (counter < add) {
        cursorDate = addWeeks(cursorDate, 1);

        const nextWeek = getWeek(cursorDate, {
            locale: nl,
        });

        const nextYear = getYear(cursorDate);

        out.push([nextWeek, nextYear]);

        counter++;
    }

    return out;
}

export function getCurrentYear(): number {
    return getYear(new Date());
}
