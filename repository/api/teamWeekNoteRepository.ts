import { TeamWeekNotesResponseBody } from './../../server/response/types.d';
import { TeamWeekNote } from '../../model/planning';

export async function fetchAll(): Promise<TeamWeekNote[]> {
    const response = await fetch('http://localhost:3000/api/team-week-notes');

    const {
        teamWeekNotes,
    } = (await response.json()) as TeamWeekNotesResponseBody;

    return teamWeekNotes;
}

export async function remove(note: TeamWeekNote): Promise<void> {
    await fetch(`http://localhost:3000/api/team-week-notes/${note.id}`, {
        method: 'DELETE',
    });
}

export async function persist(note: TeamWeekNote): Promise<void> {
    await fetch('http://localhost:3000/api/team-week-notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
}
