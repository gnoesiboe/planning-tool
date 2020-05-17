import { TeamWeekNote } from './../../../model/planning';
import produce from 'immer';

export function removeNoteFromTeamWeekNotes(
    teamWeekNotes: TeamWeekNote[],
    noteToRemove: TeamWeekNote
): TeamWeekNote[] {
    return produce<TeamWeekNote[]>(teamWeekNotes, (nextTeamWeekotes) => {
        return nextTeamWeekotes.filter(
            (cursor) => cursor.id !== noteToRemove.id
        );
    });
}

export function addNoteToTeamWeekNotes(
    teamWeekNotes: TeamWeekNote[],
    newNote: TeamWeekNote
): TeamWeekNote[] {
    return produce<TeamWeekNote[]>(teamWeekNotes, (nextTeamWeekNotes) => {
        nextTeamWeekNotes.push(newNote);
    });
}
