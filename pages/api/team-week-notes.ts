import { TeamWeekNotesResponseBody } from './../../server/response/types.d';
import { NextApiRequest, NextApiResponse } from 'next';
import {
    findAll,
    persist,
} from '../../repository/database/teamWeekNoteRepository';
import { strict as assert } from 'assert';
import {
    sendMethodNotAllowedResponse,
    sendValidationErrorResponse,
    sendBadRequestResponse,
} from '../../server/response/handler/errorResponseHandler';
import Joi from '@hapi/joi';
import { getCurrentYear } from '../../utility/dateTimeUtilities';
import { findOneWithId } from '../../repository/database/teamRepository';
import { createTeamWeekNoteFromRequestInput } from '../../model/factory/teamWeekNoteFactory';
import { sendCreationSuccessfulResponse } from '../../server/response/handler/successResponseHandler';

const inputSchema = Joi.object({
    id: Joi.string().required(),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
    teamId: Joi.string().required(),
    note: Joi.string().required(),
}).required();

export type PostRequestInput = {
    id: string;
    week: number;
    year: number;
    teamId: string;
    note: string;
};

const handleGetRequest = async (response: NextApiResponse) => {
    const teamWeekNotes = await findAll();

    const body: TeamWeekNotesResponseBody = { teamWeekNotes };

    response.statusCode = 200;
    response.json(body);
};

const handlePostRequest = async (
    request: NextApiRequest,
    response: NextApiResponse
) => {
    const { error, value } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: PostRequestInput = value;

    const team = await findOneWithId(input.teamId);

    if (!team) {
        sendBadRequestResponse(
            response,
            `No team found with id '${input.teamId}'`
        );

        return;
    }

    const teamWeekNote = createTeamWeekNoteFromRequestInput(input);

    await persist(teamWeekNote);

    sendCreationSuccessfulResponse(response);
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method } = request;

    assert.ok(
        typeof method === 'string',
        'Expecting method to be available at this point'
    );

    switch (method) {
        case 'GET':
            handleGetRequest(response);
            break;

        case 'POST':
            handlePostRequest(request, response);
            break;

        default:
            sendMethodNotAllowedResponse(response, method, ['GET', 'POST']);
            break;
    }
};
