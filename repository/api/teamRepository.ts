import { createGetTeamListUrl } from './../../server/routing/urlGenerator';
import { TeamsResponseBody } from '../../server/response/types';
import { Team } from '../../model/planning';

export async function fetchAll(): Promise<Team[]> {
    const response = await fetch(createGetTeamListUrl());

    const { teams } = (await response.json()) as TeamsResponseBody;

    return teams;
}
