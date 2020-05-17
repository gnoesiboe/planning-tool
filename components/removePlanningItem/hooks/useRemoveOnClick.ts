import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { PlanningItem } from './../../../model/planning';
import { MouseEventHandler } from 'react';

export default function useRemoveOnClick(item: PlanningItem) {
    const { removePlanningItem } = usePlanningContext();

    const onClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (!confirm('Are you sure?')) {
            return;
        }

        removePlanningItem(item);
    };

    return { onClick };
}
