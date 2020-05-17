import { Team } from '../../model/planning';
import { executeSelect } from '../../storage/database';

export async function findAllOrderedByName(): Promise<Team[]> {
    return await executeSelect<Team>('SELECT * FROM team ORDER BY name ASC');
}

export async function findOneWithId(id: string): Promise<Team | null> {
    const results = await executeSelect<Team>(
        `SELECT * FROM team WHERE id = '${id}'`
    );

    return results.pop() || null;
}
