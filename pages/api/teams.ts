import { TeamsResponseBody } from '../../server/response/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAllOrderedByName as findAllTeams } from '../../repository/database/teamRepository';

export default async (_request: NextApiRequest, response: NextApiResponse) => {
    const teams = await findAllTeams();

    const body: TeamsResponseBody = { teams };

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(body));
};
