import { ProjectBudgetItem } from '../planning';
import { Result } from '../../repository/database/projectBudgetItemRepository';

export function createProjectBudgetItemFromDatabaseResult(
    result: Result
): ProjectBudgetItem {
    return {
        id: result.id,
        projectId: result.project_id,
        from: {
            week: result.week_from,
            year: result.year_from,
        },
        until: {
            week: result.week_until,
            year: result.year_until,
        },
        noOfWeeks: result.no_of_weeks,
        comments: result.comments,
        createdAt: result.created_at,
    };
}
