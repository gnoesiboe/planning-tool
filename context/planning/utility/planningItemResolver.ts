import { Planning, PlanningItem } from './../../../model/planning';

export function resolveItemInPlanning(
    id: string,
    planning: Planning
): PlanningItem | null {
    for (let week in planning) {
        const itemsInWeek = planning[week];

        const item = itemsInWeek.find((cursorItem) => cursorItem.id === id);

        if (item) {
            return item;
        }
    }

    return null;
}
