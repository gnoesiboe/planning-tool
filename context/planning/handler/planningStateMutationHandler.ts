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

export function updateItemInPlanning(
    planning: Planning,
    updatedItem: PlanningItem
): Planning {
    return produce<Planning>(planning, (nextPlanning) => {
        Object.keys(planning).map((week) => {
            const items = nextPlanning[week];

            const itemIndex = items.findIndex(
                (item) => item.id === updatedItem.id
            );

            if (itemIndex !== -1) {
                items[itemIndex] = updatedItem;
            }
        });
    });
}

export function moveItemToOtherWeekInPlanning(
    itemToMove: PlanningItem,
    newWeek: number,
    planning: Planning
): Planning {
    return produce<Planning>(planning, (nextPlanning) => {
        // remove from current week
        nextPlanning[itemToMove.week] = nextPlanning[itemToMove.week].filter(
            (cursorItem) => cursorItem.id !== itemToMove.id
        );

        // add to next week
        if (typeof nextPlanning[newWeek] === 'undefined') {
            nextPlanning[newWeek] = [];
        }

        nextPlanning[newWeek].push(itemToMove);
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
