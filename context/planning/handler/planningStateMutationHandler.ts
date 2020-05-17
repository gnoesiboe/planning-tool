import { PlanningItem, Planning } from '../../../model/planning';
import produce from 'immer';

export function addItemToPlanning(
    planning: Planning,
    newItem: PlanningItem
): Planning {
    return produce<Planning>(planning, (nextPlanning) => {
        if (typeof nextPlanning[newItem.week] === 'undefined') {
            nextPlanning[newItem.week] = [];
        }

        nextPlanning[newItem.week].push(newItem);
    });
}

export function removeItemFromPlanning(
    planning: Planning,
    itemToRemove: PlanningItem
): Planning {
    return produce<Planning>(planning, (nextPlanning) => {
        nextPlanning[itemToRemove.week] = nextPlanning[
            itemToRemove.week
        ].filter((cursorItem) => cursorItem.id !== itemToRemove.id);
    });
}
