import { QueryParams } from './../../storage/database';
import { PlanningItem } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import { createPlanningItemFromDatabaseResult } from '../../model/factory/planningItemFactory';
import { createArrayContainingValue } from '../../utility/arrayUtilities';

export type Result = {
    id: string;
    week: number;
    year: number;
    project_id: string;
    team_id: string;
    notes: string | null;
};

export type WeekYearPair = {
    week: number;
    year: number;
};

export async function findAllUpcoming(
    teamIds: string[] = [],
    from: WeekYearPair,
    until: WeekYearPair
): Promise<PlanningItem[]> {
    const baseQuery = `
        SELECT
            pi.*
        FROM
            planning_item pi
        INNER JOIN
            project p ON p.id = pi.project_id
        INNER JOIN
            team t ON t.id = pi.team_id
        `;
    const params: QueryParams = [];
    const wheres: string[] = [];

    // add timespan filters
    wheres.push(
        'CONCAT(pi.year, pi.week) >= ?',
        'CONCAT(pi.year, pi.week) <= ?'
    );
    params.push(`${from.year}${from.week}`, `${until.year}${until.week}`);

    // add team filters
    if (teamIds.length > 0) {
        const placeholders = createArrayContainingValue(
            '?',
            teamIds.length
        ).join(', ');
        wheres.push(`t.id IN (${placeholders})`);
        params.push(...teamIds);
    }

    const query = `
        ${baseQuery}
        WHERE ${wheres.join(' AND ')}
        ORDER BY
            pi.week ASC,
            p.name ASC
    `;

    const results = await executeSelect<Result>(query, params);

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
    teamId,
}: PlanningItem): Promise<void> {
    await executeQuery(
        'UPDATE planning_item SET notes = ?, week = ?, year = ?, team_id = ? WHERE id = ? LIMIT 1',
        [notes, week, year, teamId, id]
    );
}

export async function remove(item: PlanningItem): Promise<void> {
    await executeQuery(`DELETE FROM planning_item WHERE id = ? LIMIT 1`, [
        item.id,
    ]);
}
