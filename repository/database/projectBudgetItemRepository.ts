import { ProjectBudgetItem } from './../../model/planning.d';
import { executeSelect } from '../../storage/database';
import { createProjectBudgetItemFromDatabaseResult } from '../../model/factory/projectBudgetItemFactory';

export type Result = {
    id: string;
    project_id: string;
    week_from: number;
    year_from: number;
    week_until: number;
    year_until: number;
    created_at: string;
    no_of_weeks: number;
    comments: string | null;
};

export async function fetchAll(): Promise<ProjectBudgetItem[]> {
    const results = await executeSelect<Result>(`
        SELECT *
        FROM project_budget_item
        ORDER BY project_id ASC, YEARWEEK(year_from, week_from) ASC
    `);

    return results.map((result) =>
        createProjectBudgetItemFromDatabaseResult(result)
    );
}
