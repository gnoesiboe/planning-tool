import { ResultWithUsageCount } from './../../repository/database/projectBudgetItemRepository';
import { ProjectBudgetItemWithUsageCount } from './../planning.d';

export function createProjectBudgetItemWithUsageCountFromDatabaseResult(
    result: ResultWithUsageCount
): ProjectBudgetItemWithUsageCount {
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
        usageCount: result.usage_count,
    };
}
