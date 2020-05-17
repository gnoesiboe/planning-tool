import { TeamWeekNotesResponseBody } from './../../server/response/types.d';
import { TeamWeekNote } from '../../model/planning';

export async function fetchAll(): Promise<TeamWeekNote[]> {
    const response = await fetch('http://localhost:3000/api/team-week-notes');

    const {
        teamWeekNotes,
    } = (await response.json()) as TeamWeekNotesResponseBody;

    return teamWeekNotes;
}
