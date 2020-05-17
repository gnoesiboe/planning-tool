import { ErrorResponseBody } from '../types';
import { NextApiResponse } from 'next';
import { ValidationErrorItem } from '@hapi/joi';

export function sendValidationErrorResponse(
    response: NextApiResponse,
    validationErrors: ValidationErrorItem[]
) {
    const body: ErrorResponseBody = {
        message: 'Input did not validate',
        validationErrors: validationErrors,
    };

    response.statusCode = 400;
    response.json(body);
}

export function sendBadRequestResponse(
    response: NextApiResponse,
    message: string
) {
    const body: ErrorResponseBody = { message };

    response.statusCode = 400;
    response.json(body);
}

export function sendMethodNotAllowedResponse(
    response: NextApiResponse,
    method: string,
    allowedMethods: string[]
) {
    const body: ErrorResponseBody = {
        message: `Method '${method}' Not Allowed`,
    };

    response.setHeader('Allow', allowedMethods);
    response.status(405);
    response.json(body);
}

export function sendNotFoundResponse(
    response: NextApiResponse,
    message: string
) {
    const body: ErrorResponseBody = { message };

    response.status(404);
    response.json(body);
}
