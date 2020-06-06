import { ProjectBudgetItemWithUsageCount } from './../../model/planning.d';
import { executeSelect } from '../../storage/database';
import { createProjectBudgetItemWithUsageCountFromDatabaseResult } from '../../model/factory/projectBudgetItemFactory';

export interface Result {
    id: string;
    project_id: string;
    week_from: number;
    year_from: number;
    week_until: number;
    year_until: number;
    created_at: string;
    no_of_weeks: number;
    comments: string | null;
}

export interface ResultWithUsageCount extends Result {
    usage_count: number;
}

export async function fetchAllWithUsageCount(): Promise<
    ProjectBudgetItemWithUsageCount[]
> {
    const results = await executeSelect<ResultWithUsageCount>(`
        SELECT
            pbi.*,
            (
                SELECT
                    COUNT(*)
                FROM planning_item pi
                    WHERE
                        pi.project_id = pbi.project_id
                    AND
                        CONCAT(pi.year, pi.week) BETWEEN CONCAT(pbi.year_from, pbi.week_from) AND CONCAT(pbi.year_until, pbi.week_until)
            ) AS 'usage_count'
        FROM
            project_budget_item pbi
        INNER JOIN
            project p ON p.id = pbi.project_id
        ORDER BY
            p.name ASC,
            CONCAT(year_from, week_from) ASC;
    `);

    return results.map((result) =>
        createProjectBudgetItemWithUsageCountFromDatabaseResult(result)
    );
}
