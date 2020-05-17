import { TeamWeekNote, Team } from './../planning';
import { Result } from './../../repository/database/teamWeekNoteRepository';
import { FormValues } from '../../components/addTeamWeekNote/hooks/useHandleFormState';
import { createUuid } from '../../utility/idGenerator';
import { PostRequestInput } from '../../pages/api/team-week-notes';

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

export function createTeamWEekNoteFromFormValues(
    team: Team,
    week: number,
    year: number,
    values: FormValues
): TeamWeekNote {
    return {
        id: createUuid(),
        teamId: team.id,
        week,
        year,
        note: values.note,
    };
}

export function createTeamWeekNoteFromRequestInput({
    id,
    teamId,
    week,
    year,
    note,
}: PostRequestInput): TeamWeekNote {
    return {
        id,
        teamId,
        week,
        year,
        note,
    };
}
