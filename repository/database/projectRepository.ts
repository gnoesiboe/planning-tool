import { ProjectWithItemCount } from './../../model/planning.d';
import { Project } from '../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import {
    createProjectFromDatabaseResult,
    createProjectWithItemCountFromResult,
} from '../../model/factory/projectFactory';

export interface Result {
    id: string;
    name: string;
    color: string;
    active: 1 | 0;
}

export interface ResultWithItemCount extends Result {
    no_of_items: number;
}

export async function findAllOrderedByNameAndActiveStatusWithItemCount(): Promise<
    ProjectWithItemCount[]
> {
    const results = await executeSelect<ResultWithItemCount>(
        `
            SELECT p.*, COUNT(*) as no_of_items
            FROM project p
            LEFT JOIN planning_item pi ON pi.project_id = p.id
            GROUP BY p.id
            ORDER BY active DESC, name ASC
        `
    );

    return results.map((result) =>
        createProjectWithItemCountFromResult(result)
    );
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
