import { Planning, PlanningItem, Team } from './../../../model/planning';

export function selectItemsForTeamForWeek(
    planning: Planning,
    week: number,
    team: Team
): PlanningItem[] {
    const itemsForWeek = planning[week] || [];

    return itemsForWeek
        .filter((item) => item.teamId === team.id)
        .sort((first, second) => {
            if (first.projectId > second.projectId) {
                return 1;
            }

            if (first.projectId < second.projectId) {
                return -1;
            }

            return 0;
        });
}

export function selectItemsGrouppedByWeek(
    planningItems: PlanningItem[]
): Planning {
    const planning: Planning = {};

    planningItems.forEach((planningItem) => {
        const week = planningItem.week;

        if (typeof planning[week] === 'undefined') {
            planning[week] = [];
        }

        planning[week].push(planningItem);
    });

    return planning;
}
