import { TeamWeekNote } from './../planning';
import { Result } from './../../repository/database/teamWeekNoteRepository';

export function createTeamWeekNoteFromDatabaseResult(
    result: Result
): TeamWeekNote {
    return {
        id: result.id,
        teamId: result.team_id,
        week: result.week,
        year: result.year,
        note: result.note,
    };
}
