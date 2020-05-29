import { PlanningFilters } from './../../../context/planning/hooks/useManagePlanning';
import {
    Planning,
    PlanningItem,
    Team,
    WeekPlanningItems,
    Project,
    ExstendedPlanningItem,
} from './../../../model/planning';
import { createRangeOfWeekYearPairs } from '../../../utility/dateTimeUtilities';
import { resolveProjectOrThrow } from './projectResolver';
import { sortBy } from 'lodash';

export function selectItemsGrouppedByWeekAndTeam(
    teams: Team[],
    projects: Project[],
    planningItems: PlanningItem[],
    filters: PlanningFilters
): Planning {
    const allProjectIds = projects.map(({ id }) => id);
    const weeksWithYears = createRangeOfWeekYearPairs(
        filters.from,
        filters.until
    );

    const planning: Planning = [];

    // add rows for all teams and weeks
    teams.forEach((team) => {
        const weeks: WeekPlanningItems = [];

        weeksWithYears.forEach(({ week, year }) => {
            const items: ExstendedPlanningItem[] = [];
            const projectIdsInWeek: string[] = [];

            planningItems.forEach((item) => {
                if (
                    item.week !== week ||
                    item.teamId !== team.id ||
                    item.year !== year
                ) {
                    return;
                }

                projectIdsInWeek.push(item.projectId);

                const project = resolveProjectOrThrow(projects, item.projectId);

                items.push({ ...item, project });
            });

            const sortedItems = sortBy(items, (item) => item.project.name);

            const notSetProjectIds = allProjectIds.filter(
                (projectId) => !projectIdsInWeek.includes(projectId)
            );

            weeks.push({ week, year, items: sortedItems, notSetProjectIds });
        });

        planning.push({ team, weeks });
    });

    return planning;
}
