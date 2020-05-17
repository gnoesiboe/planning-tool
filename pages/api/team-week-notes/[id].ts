import { NextApiRequest, NextApiResponse } from 'next';
import { strict as assert } from 'assert';
import {
    sendMethodNotAllowedResponse,
    sendNotFoundResponse,
} from '../../../server/response/handler/errorResponseHandler';
import {
    findOneWithId,
    remove,
} from '../../../repository/database/teamWeekNoteRepository';
import { sendUpdateSuccessResponse } from '../../../server/response/handler/successResponseHandler';

const handleDeleteRequest = async (response: NextApiResponse, id: string) => {
    const item = await findOneWithId(id);

    if (!item) {
        sendNotFoundResponse(
            response,
            `No team week note found with id: '${id}'`
        );

        return;
    }

    remove(item);

    sendUpdateSuccessResponse(response);
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method, query } = request;

    assert.ok(
        typeof method === 'string',
        'Expecting method to be available at this point'
    );

    const id = query.id;

    assert.ok(typeof id === 'string');

    switch (method) {
        case 'DELETE':
            handleDeleteRequest(response, id);
            break;

        default:
            sendMethodNotAllowedResponse(response, method, ['DELETE']);
            break;
    }
};
