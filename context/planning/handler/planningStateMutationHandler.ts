import { PlanningItem } from '../../../model/planning';
import produce from 'immer';

export function addItemToPlanning(
    planningItems: PlanningItem[],
    newItem: PlanningItem
): PlanningItem[] {
    return produce<PlanningItem[]>(planningItems, (nextPlanningItems) => {
        nextPlanningItems.push(newItem);
    });
}

export function updateItemInPlanningItemsCollection(
    planningItems: PlanningItem[],
    updatedItem: PlanningItem
): PlanningItem[] {
    return produce<PlanningItem[]>(planningItems, (nextPlanningItems) => {
        const itemIndex = nextPlanningItems.findIndex(
            (cursorItem) => updatedItem.id === cursorItem.id
        );

        if (itemIndex === -1) {
            return;
        }

        nextPlanningItems[itemIndex] = updatedItem;
    });
}

export function removeItemFromPlanning(
    planningItems: PlanningItem[],
    itemToRemove: PlanningItem
): PlanningItem[] {
    return produce<PlanningItem[]>(planningItems, (nextPlanningItems) => {
        return nextPlanningItems.filter(
            (cursorItem) => cursorItem.id !== itemToRemove.id
        );
    });
}
