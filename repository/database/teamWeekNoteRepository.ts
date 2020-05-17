import { TeamWeekNote } from './../../model/planning';
import { executeSelect } from '../../storage/database';
import { createTeamWeekNoteFromDatabaseResult } from '../../model/factory/teamWeekNoteFactory';

export type Result = {
    id: string;
    team_id: string;
    week: number;
    year: number;
    note: string;
};

export async function findAll(): Promise<TeamWeekNote[]> {
    const results = await executeSelect<Result>(`
        SELECT
            *
        FROM
            team_week_note
        ORDER BY
            created_at ASC
    `);

    return results.map((result) =>
        createTeamWeekNoteFromDatabaseResult(result)
    );
}
