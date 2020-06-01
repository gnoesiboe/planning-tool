import { usePlanningContext } from '../../../context/planning/PlanningContext';
import {
    transform as transformToValue,
    reverseTransform,
} from './weekyearToFormChoiceValueTransformer';
import {
    getRangeOfWeekYearPairsFromDate,
    subtractMonths,
} from '../../../utility/dateTimeUtilities';
import { FiltersValues } from '../../../server/controller/planningItem/indexController';
import { OptionsType } from 'react-select';
import { SelectOption } from '../../primities/form/FormChoice';

export default function useHandleFormState() {
    const {
        filters: { from, until, teamIds },
        onFilterChange,
        teams,
    } = usePlanningContext();

    const choiceRange = getRangeOfWeekYearPairsFromDate(
        subtractMonths(new Date(), 3),
        53
    );

    const fromValue = transformToValue(from);
    const untilValue = transformToValue(until);

    const onPeriodFieldChange = (
        field: keyof FiltersValues,
        newValue: string
    ) => {
        onFilterChange({
            [field]: reverseTransform(newValue),
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
        from,
        fromValue,
        until,
        untilValue,
        choiceRange,
        onPeriodFieldChange,
        teamOptions,
        teamsValue,
        onTeamFieldChange,
    };
}
