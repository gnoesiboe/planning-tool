import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { OnItemDroppedHandler } from './../components/Week';

export default function useMovePlanningItemToOtherWeekOnDrop() {
    const { movePlanningItem } = usePlanningContext();

    const onItemDropped: OnItemDroppedHandler = (id, moveToWeek, moveToYear) =>
        movePlanningItem(id, moveToWeek, moveToYear);

    return { onItemDropped };
}
