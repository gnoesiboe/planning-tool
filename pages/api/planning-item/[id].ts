import { NextApiRequest, NextApiResponse } from 'next';

import { strict as assert } from 'assert';
import {
    sendMethodNotAllowedResponse,
    sendNotFoundResponse,
    sendValidationErrorResponse,
} from '../../../server/response/handler/errorResponseHandler';
import { sendUpdateSuccessResponse } from '../../../server/response/handler/successResponseHandler';
import {
    findOneWithId,
    remove,
    update,
} from '../../../repository/database/planningItemRepository';
import Joi from '@hapi/joi';

const putInputSchema = Joi.object({
    notes: Joi.string().allow(null),
}).required();

export type PutRequestBody = {
    notes: string;
};

const handleDeleteRequest = async (response: NextApiResponse, id: string) => {
    const item = await findOneWithId(id);

    if (!item) {
        sendNotFoundResponse(
            response,
            `No planning item found with id: '${id}'`
        );

        return;
    }

    remove(item);

    sendUpdateSuccessResponse(response);
};

const handlePutRequest = async (
    request: NextApiRequest,
    response: NextApiResponse,
    id: string
) => {
    const item = await findOneWithId(id);

    if (!item) {
        sendNotFoundResponse(
            response,
            `No planning item found with id: '${id}'`
        );

        return;
    }

    const { value, error } = putInputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: PutRequestBody = value;

    const newItem = {
        ...item,
        notes: input.notes,
    };

    await update(newItem);

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

        case 'PUT':
            handlePutRequest(request, response, id);
            break;

        default:
            sendMethodNotAllowedResponse(response, method, ['DELETE', 'PUT']);
            break;
    }
};
