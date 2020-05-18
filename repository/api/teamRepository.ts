import { createGetTeamListUrl } from './../../server/routing/urlGenerator';
import { TeamsResponseBody } from '../../server/response/types';
import { Team } from '../../model/planning';
import { executeGetRequest } from '../../api/client';

export async function fetchAll(): Promise<Team[]> {
    const { teams } = await executeGetRequest<TeamsResponseBody>(
        createGetTeamListUrl()
    );

    return teams;
}
