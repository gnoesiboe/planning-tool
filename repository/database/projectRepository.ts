import { Project } from '../../model/planning';
import { executeSelect } from '../../storage/database';

export async function findAllOrderedByName(): Promise<Project[]> {
    return await executeSelect<Project>('SELECT * FROM project');
}

export async function findOneWithId(id: string): Promise<Project | null> {
    const results = await executeSelect<Project>(
        `SELECT * FROM project WHERE id = '${id}'`
    );

    return results.pop() || null;
}
