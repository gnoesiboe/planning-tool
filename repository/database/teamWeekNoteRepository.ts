import { TeamWeekNote } from './../../model/planning';
import { executeSelect, executeQuery } from '../../storage/database';
import { createTeamWeekNoteFromDatabaseResult } from '../../model/factory/teamWeekNoteFactory';

export type Result = {
    id: string;
    team_id: string;
    week: number;
    year: number;
    note: string;
};

export async function findAll(): Promise<TeamWeekNote[]> {
    const results = await executeSelect<Result>(
        'SELECT * FROM team_week_note ORDER BY created_at ASC'
    );

    return results.map((result) =>
        createTeamWeekNoteFromDatabaseResult(result)
    );
}

export async function findOneWithId(id: string): Promise<TeamWeekNote | null> {
    const results = await executeSelect<Result>(
        'SELECT * FROM team_week_note WHERE id = ?',
        [id]
    );

    const firstResult = results.pop() || null;

    return firstResult
        ? createTeamWeekNoteFromDatabaseResult(firstResult)
        : null;
}

export async function remove(note: TeamWeekNote): Promise<void> {
    await executeQuery('DELETE FROM team_week_note WHERE id = ?', [note.id]);
}

export async function persist({
    id,
    teamId,
    week,
    year,
    note,
}: TeamWeekNote): Promise<void> {
    await executeQuery(
        'INSERT INTO team_week_note (id, team_id, week, year, note, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [id, teamId, week, year, note]
    );
}
