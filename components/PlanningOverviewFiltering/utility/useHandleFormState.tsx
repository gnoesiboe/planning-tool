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

export default function useHandleFormState() {
    const {
        filters: { from, until },
        onFilterChange,
    } = usePlanningContext();

    const choiceRange = getRangeOfWeekYearPairsFromDate(
        subtractMonths(new Date(), 3),
        53
    );

    const fromValue = transformToValue(from);
    const untilValue = transformToValue(until);

    const onFieldChange = (field: keyof FiltersValues, newValue: string) => {
        onFilterChange({
            [field]: reverseTransform(newValue),
        });
    };

    return { from, fromValue, until, untilValue, choiceRange, onFieldChange };
}
