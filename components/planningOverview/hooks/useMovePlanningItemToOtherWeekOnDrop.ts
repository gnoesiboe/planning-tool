import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { OnItemDroppedHandler } from './../components/Week';

export default function useMovePlanningItemToOtherWeekOnDrop() {
    const { movePlanningItem } = usePlanningContext();

    const onItemDropped: OnItemDroppedHandler = (
        id,
        newWeek,
        newYear,
        newTeamId
    ) => movePlanningItem(id, newWeek, newYear, newTeamId);

    return { onItemDropped };
}
