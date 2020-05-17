import { TeamsResponseBody } from '../../server/response/types';
import { Team } from '../../model/planning';

export async function fetchAll(): Promise<Team[]> {
    const response = await fetch('http://localhost:3000/api/teams');

    const { teams } = (await response.json()) as TeamsResponseBody;

    return teams;
}
