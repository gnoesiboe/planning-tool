import { PlanningItem } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import { createPlanningItemFromDatabaseResult } from '../../model/factory/planningItemFactory';

export type Result = {
    id: string;
    week: number;
    year: number;
    project_id: string;
    team_id: string;
    notes: string | null;
};

export async function findAll(): Promise<PlanningItem[]> {
    const results = await executeSelect<Result>(`
        SELECT
            pi.*
        FROM
            planning_item pi
        INNER JOIN
            project p ON p.id = pi.project_id
        ORDER BY
            pi.week ASC,
            p.name ASC
    `);

    return results.map((result) =>
        createPlanningItemFromDatabaseResult(result)
    );
}

export async function findOneWithId(id: string): Promise<PlanningItem | null> {
    const results = await executeSelect<Result>(`
        SELECT
            *
        FROM
            planning_item
        WHERE
            id = '${id}'
    `);

    const firstResult = results.pop();

    if (!firstResult) {
        return null;
    }

    return createPlanningItemFromDatabaseResult(firstResult);
}

export async function persist({
    id,
    week,
    teamId,
    projectId,
    notes,
}: PlanningItem): Promise<void> {
    await executeQuery(`
        INSERT INTO planning_item (id, week, team_id, project_id, notes)
        VALUES (
            '${id}',
            ${week},
            '${teamId}',
            '${projectId}',
            ${notes ? `'${notes}'` : 'NULL'}
        )
    `);
}

export async function update({ id, notes }: PlanningItem): Promise<void> {
    await executeQuery(`
        UPDATE planning_item
        SET notes = '${notes}'
        WHERE id = '${id}'
        LIMIT 1
    `);
}

export async function remove(item: PlanningItem): Promise<void> {
    await executeQuery(`
        DELETE FROM planning_item
        WHERE id = '${item.id}'
        LIMIT 1
    `);
}
