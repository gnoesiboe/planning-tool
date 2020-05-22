import { NextApiRequest, NextApiResponse } from 'next';
import { strict as assert } from 'assert';
import { sendMethodNotAllowedResponse } from '../response/handler/errorResponseHandler';

export type Controller = (
    request: NextApiRequest,
    response: NextApiResponse
) => void;

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type MethodControllerMapping = {
    [method in RequestMethod]?: Controller;
};

export function createMultiMethodController(
    handlers: MethodControllerMapping
): Controller {
    return async (request: NextApiRequest, response: NextApiResponse) => {
        const method = request.method as RequestMethod;

        assert.ok(
            typeof method === 'string',
            'Expecting method to be available at this point'
        );

        const handler = handlers[method];

        if (!handler) {
            sendMethodNotAllowedResponse(response, method, ['POST']);

            return;
        }

        return handler(request, response);
    };
}
