import { WeekYearPair } from './../../../utility/types.d';

const seperator = '_';

export function transform(pair: WeekYearPair): string {
    return pair.week + seperator + pair.year;
}

export function reverseTransform(value: string): WeekYearPair {
    const [weekAsString, yearAsString] = value.split(seperator);

    return {
        week: parseInt(weekAsString),
        year: parseInt(yearAsString),
    };
}
