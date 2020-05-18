import { getWeek, addWeeks, getYear } from 'date-fns';
import { nl } from 'date-fns/locale';

export function getRangeOfWeeksWithYearsFromCurrent(
    add: number
): Array<[number, number]> {
    const out: Array<[number, number]> = [[getCurrentWeek(), getCurrentYear()]];

    let cursorDate = new Date();
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

export function getCurrentWeek(): number {
    return getWeek(new Date(), {
        locale: nl,
    });
}
