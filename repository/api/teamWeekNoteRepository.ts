import {
    createGetTeamWeekNoteListUrl,
    createDeleteTeamWeekNoteUrl,
    createPostTeamWeekNoteUrl,
} from './../../server/routing/urlGenerator';
import { TeamWeekNotesResponseBody } from './../../server/response/types.d';
import { TeamWeekNote } from '../../model/planning';
import {
    executeGetRequest,
    executeDeleteRequest,
    executePostRequest,
} from '../../api/client';

export async function fetchAll(): Promise<TeamWeekNote[]> {
    const { teamWeekNotes } = await executeGetRequest<
        TeamWeekNotesResponseBody
    >(createGetTeamWeekNoteListUrl());

    return teamWeekNotes;
}

export async function remove(note: TeamWeekNote): Promise<void> {
    await executeDeleteRequest(createDeleteTeamWeekNoteUrl(note.id));
}

export async function persist(note: TeamWeekNote): Promise<void> {
    await executePostRequest(createPostTeamWeekNoteUrl(), note);
}
