import { SuccessResponseBody } from './../types.d';
import { NextApiResponse } from 'next';

export function sendUpdateSuccessResponse(response: NextApiResponse) {
    const body: SuccessResponseBody = {
        success: true,
    };

    response.statusCode = 204;
    response.json(body);
}

export function sendCreationSuccessfulResponse(response: NextApiResponse) {
    const body: SuccessResponseBody = {
        success: true,
    };

    response.statusCode = 201;
    response.json(body);
}
