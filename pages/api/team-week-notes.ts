import { TeamWeekNotesResponseBody } from './../../server/response/types.d';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAll } from '../../repository/database/teamWeekNoteRepository';

export default async (_request: NextApiRequest, response: NextApiResponse) => {
    const teamWeekNotes = await findAll();

    const body: TeamWeekNotesResponseBody = { teamWeekNotes };

    response.statusCode = 200;
    response.json(body);
};
