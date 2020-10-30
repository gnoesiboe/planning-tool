import {
    ProjectWithItemCount,
    ProjectBudgetItemWithUsageCount,
} from './../../../model/planning.d';
import { usePlanningContext } from '../../../context/planning/PlanningContext';

interface ProjectWithBudgetItems extends ProjectWithItemCount {
    budgetItems: ProjectBudgetItemWithUsageCount[];
}

export default function useSelectProjectsWithBudget() {
    const { projects, projectBudgetItems } = usePlanningContext();

    if (!projects || !projectBudgetItems) {
        return { projectsWithBudgetItems: [] };
    }

    const projectsWithBudgetItems = projects.map((project) => {
        const projectWithBudgetItems: ProjectWithBudgetItems = {
            ...project,
            budgetItems: [],
        };

        const budgetItems = projectBudgetItems.filter(
            (budgetItem) => budgetItem.projectId === project.id
        );

        projectWithBudgetItems.budgetItems = budgetItems || [];

        return projectWithBudgetItems;
    });

    return { projectsWithBudgetItems };
}
