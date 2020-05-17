import { NextApiRequest, NextApiResponse } from 'next';
import { strict as assert } from 'assert';
import {
    sendMethodNotAllowedResponse,
    sendValidationErrorResponse,
    sendBadRequestResponse,
} from '../../server/response/handler/errorResponseHandler';
import { findOneWithId as findProject } from '../../repository/database/projectRepository';
import { findOneWithId as findTeam } from '../../repository/database/teamRepository';
import Joi from '@hapi/joi';
import { createPlanningItemFromRequestInput } from '../../model/factory/planningItemFactory';
import { sendCreationSuccessfulResponse } from '../../server/response/handler/successResponseHandler';
import { getCurrentYear } from '../../utility/dateTimeUtilities';
import { persist } from '../../repository/database/planningItemRepository';

const inputSchema = Joi.object({
    id: Joi.string().required(),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
    projectId: Joi.string().required(),
    teamId: Joi.string().required(),
    notes: Joi.string().allow(null),
}).required();

export type RequestBody = {
    id: string;
    week: number;
    year: number;
    projectId: string;
    teamId: string;
    notes?: string;
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method } = request;

    assert.ok(
        typeof method === 'string',
        'Expecting method to be available at this point'
    );

    if (method !== 'POST') {
        sendMethodNotAllowedResponse(response, method, ['POST']);

        return;
    }

    const { error, value } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: RequestBody = value;

    const project = await findProject(input.projectId);

    if (!project) {
        sendBadRequestResponse(
            response,
            `No project found with id '${input.projectId}'`
        );

        return;
    }

    const team = await findTeam(input.teamId);

    if (!team) {
        sendBadRequestResponse(
            response,
            `No team found with id '${input.teamId}'`
        );

        return;
    }

    const planningItem = createPlanningItemFromRequestInput(input);

    await persist(planningItem);

    sendCreationSuccessfulResponse(response);
};
