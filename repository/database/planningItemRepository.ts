import { PlanningItem } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import { createPlanningItemFromDatabaseResult } from '../../model/factory/planningItemFactory';
import {
    getCurrentYear,
    getCurrentWeek,
} from '../../utility/dateTimeUtilities';

export type Result = {
    id: string;
    week: number;
    year: number;
    project_id: string;
    team_id: string;
    notes: string | null;
};

export async function findAllUpcoming(): Promise<PlanningItem[]> {
    const currentYear = getCurrentYear();
    const currentWeek = getCurrentWeek();

    const results = await executeSelect<Result>(
        `
            SELECT
                pi.*
            FROM
                planning_item pi
            INNER JOIN
                project p ON p.id = pi.project_id
            WHERE
                (pi.year > ? OR (pi.year = ? AND pi.week >= ?))
            ORDER BY
                pi.week ASC,
                p.name ASC
        `,
        [currentYear, currentYear, currentWeek]
    );

    return results.map((result) =>
        createPlanningItemFromDatabaseResult(result)
    );
}

export async function findOneWithId(id: string): Promise<PlanningItem | null> {
    const results = await executeSelect<Result>(
        'SELECT * FROM planning_item WHERE id = ?',
        [id]
    );

    const firstResult = results.pop();

    if (!firstResult) {
        return null;
    }

    return createPlanningItemFromDatabaseResult(firstResult);
}

export async function persist({
    id,
    week,
    year,
    teamId,
    projectId,
    notes,
}: PlanningItem): Promise<void> {
    await executeQuery(
        'INSERT INTO planning_item (id, week, year, team_id, project_id, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [id, week, year, teamId, projectId, notes]
    );
}

export async function update({
    id,
    notes,
    week,
    year,
}: PlanningItem): Promise<void> {
    await executeQuery(
        'UPDATE planning_item SET notes = ?, week = ?, year = ? WHERE id = ? LIMIT 1',
        [notes, week, year, id]
    );
}

export async function remove(item: PlanningItem): Promise<void> {
    await executeQuery(`DELETE FROM planning_item WHERE id = ? LIMIT 1`, [
        item.id,
    ]);
}
