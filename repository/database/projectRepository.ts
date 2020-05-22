import { Project } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';

export async function findAllOrderedByName(): Promise<Project[]> {
    return await executeSelect<Project>('SELECT * FROM project');
}

export async function findOneWithId(id: string): Promise<Project | null> {
    const results = await executeSelect<Project>(
        `SELECT * FROM project WHERE id = '${id}'`
    );

    return results.pop() || null;
}

export async function persist({ id, name, color }: Project): Promise<void> {
    await executeQuery(`
        INSERT INTO project (id, name, color)
        VALUES
            '${id}',
            '${name},
            '${color}
    `);
}

export async function update({ id, name, color }: Project): Promise<void> {
    await executeQuery(`
        UPDATE project
        SET
            name = '${name}',
            color = '${color}'
        WHERE
            id = '${id}'
        LIMIT 1
    `);
}
