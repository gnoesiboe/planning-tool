import { Project } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import { createProjectFromDatabaseResult } from '../../model/factory/projectFactory';

export type Result = {
    id: string;
    name: string;
    color: string;
    active: 1 | 0;
};

export async function findAllOrderedByNameAndActiveStatus(): Promise<
    Project[]
> {
    const results = await executeSelect<Result>(
        'SELECT * FROM project ORDER BY active DESC, name ASC'
    );

    return results.map((result) => createProjectFromDatabaseResult(result));
}

export async function findOneWithId(id: string): Promise<Project | null> {
    const results = await executeSelect<Result>(
        'SELECT * FROM project WHERE id = ?',
        [id]
    );

    const firstResult = results.pop();

    return firstResult ? createProjectFromDatabaseResult(firstResult) : null;
}

export async function persist({
    id,
    name,
    color,
    active,
}: Project): Promise<void> {
    await executeQuery(
        'INSERT INTO project (id, name, color) VALUES (?, ?, ?)',
        [id, name, color, active ? 1 : 0]
    );
}

export async function update({
    id,
    name,
    color,
    active,
}: Project): Promise<void> {
    await executeQuery(
        'UPDATE project SET name = ?, color = ?, active = ? WHERE id = ? LIMIT 1',
        [name, color, active ? 1 : 0, id]
    );
}
