import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { PlanningItem } from './../../../model/planning';

export default function useRemoveOnClick(item: PlanningItem) {
    const { removePlanningItem } = usePlanningContext();

    const onClick = () => {
        if (!confirm('Are you sure?')) {
            return;
        }

        removePlanningItem(item);
    };

    return { onClick };
}
