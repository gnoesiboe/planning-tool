import { usePlanningContext } from '../../../context/planning/PlanningContext';
import {
    transform as transformPairToOptionValue,
    reverseTransform as reverseTransformToPair,
} from './weekyearToFormChoiceValueTransformer';
import {
    getRangeOfWeekYearPairsFromDate,
    subtractMonths,
} from '../../../utility/dateTimeUtilities';
import { OptionsType } from 'react-select';
import { SelectOption } from '../../primities/form/FormChoice';
import { WeekYearPair } from '../../../utility/types';
import { FiltersValues } from '../../../server/controller/planningItem/indexController';

export type OnPeriodFieldChange = (
    field: keyof FiltersValues,
    newValue: string
) => void;

export default function useHandleFormState() {
    const {
        filters: { from, until, teamIds },
        onFilterChange,
        teams,
    } = usePlanningContext();

    const periodRange = getRangeOfWeekYearPairsFromDate(
        subtractMonths(new Date(), 3),
        53
    );

    const periodOptions: OptionsType<SelectOption> = periodRange.map(
        (pair) => ({
            label: `${pair.week} @ ${pair.year}`,
            value: transformPairToOptionValue(pair),
        })
    );

    const determineCurrentOption = (value: WeekYearPair): SelectOption | null =>
        periodOptions
            .filter((option) => {
                const pair = reverseTransformToPair(option.value);

                return value.week === pair.week && value.year === pair.year;
            })
            .pop() || null;

    const fromValue = determineCurrentOption(from);

    const isFromDisabled = (option: SelectOption): boolean => {
        const pair = reverseTransformToPair(option.value);

        return (
            pair.year > until.year ||
            (pair.week > until.week && pair.year === until.year)
        );
    };

    const untilValue = determineCurrentOption(until);

    const isUntilDisabled = (option: SelectOption): boolean => {
        const pair = reverseTransformToPair(option.value);

        return (
            pair.year < from.year ||
            (pair.week < from.week && pair.year === from.year)
        );
    };

    const onPeriodFieldChange: OnPeriodFieldChange = (field, newValue) => {
        onFilterChange({
            [field]: reverseTransformToPair(newValue),
        });
    };

    const teamOptions: OptionsType<SelectOption> = teams
        ? teams.map((team) => ({
              value: team.id,
              label: team.name,
          }))
        : [];

    const teamsValue: SelectOption[] = teamOptions.filter((option) =>
        teamIds.includes(option.value)
    );

    const onTeamFieldChange = (newItems: SelectOption[]) => {
        onFilterChange({
            teamIds: newItems.map((item) => item.value),
        });
    };

    return {
        fromValue,
        isFromDisabled,
        untilValue,
        isUntilDisabled,
        periodOptions,
        onPeriodFieldChange,
        teamOptions,
        teamsValue,
        onTeamFieldChange,
    };
}
