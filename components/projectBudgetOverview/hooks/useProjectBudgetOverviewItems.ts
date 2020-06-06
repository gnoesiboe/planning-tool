import {
    ProjectBudgetItemWithUsageCount,
    Project,
} from './../../../model/planning.d';
import { usePlanningContext } from './../../../context/planning/PlanningContext';

export type ProjectBudgetOverviewItem = Pick<
    ProjectBudgetItemWithUsageCount,
    'comments' | 'id' | 'noOfWeeks' | 'usageCount'
> &
    Pick<Project, 'name'> & {
        periodDescription: string;
    };

export default function useProjectBudgetOverviewItems() {
    const { projectBudgetItems, projects } = usePlanningContext();

    const items: ProjectBudgetOverviewItem[] | null =
        projectBudgetItems?.map((item) => {
            const project = projects?.find(
                (cursorProject) => cursorProject.id === item.projectId
            );

            const periodDescription = `week ${item.from.week}-${
                item.until.week
            }, ${item.from.year}${
                item.until.year !== item.from.year ? `-${item.until.year}` : ''
            }`;

            return {
                id: item.id,
                name: project?.name || 'Onbekend',
                comments: item.comments,
                noOfWeeks: item.noOfWeeks,
                usageCount: item.usageCount,
                periodDescription,
            };
        }) || null;

    return { items };
}
