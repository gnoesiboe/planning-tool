import { Planning } from './../../model/planning';
import { NextApiRequest, NextApiResponse } from 'next';
import {
    findAll,
    persist,
} from '../../repository/database/planningItemRepository';
import Joi from '@hapi/joi';
import {
    sendValidationErrorResponse,
    sendMethodNotAllowedResponse,
    sendBadRequestResponse,
} from '../../server/response/handler/errorResponseHandler';
import { sendCreationSuccessfulResponse } from '../../server/response/handler/successResponseHandler';
import { sendPlanningListResponse } from '../../server/response/handler/planningResponseHandler';
import { strict as assert } from 'assert';
import { findOneWithId as findProject } from '../../repository/database/projectRepository';
import { findOneWithId as findTeam } from '../../repository/database/teamRepository';
import { createPlanningItemFromRequestInput } from '../../model/factory/planningItemFactory';
import { getCurrentYear } from '../../utility/dateTimeUtilities';

const inputSchema = Joi.object({
    id: Joi.string().required(),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
    projectId: Joi.string().required(),
    teamId: Joi.string().required(),
    notes: Joi.string().allow(null),
}).required();

export type PostRequestInput = {
    id: string;
    week: number;
    year: number;
    projectId: string;
    teamId: string;
    notes?: string;
};

const handleGetRequest = async (response: NextApiResponse) => {
    const planningItems = await findAll();

    const planning: Planning = {};

    planningItems.forEach((planningItem) => {
        const week = planningItem.week;

        if (typeof planning[week] === 'undefined') {
            planning[week] = [];
        }

        planning[week].push(planningItem);
    });

    sendPlanningListResponse(response, planning);
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

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { method } = request;

    assert.ok(
        typeof method === 'string',
        'Expecting method to be available at this point'
    );

    switch (method) {
        case 'GET':
            await handleGetRequest(response);
            break;

        case 'POST':
            // @todo move this to planning-item endpoint
            handlePostRequest(request, response);
            break;

        default:
            sendMethodNotAllowedResponse(response, method, ['GET', 'POST']);
            break;
    }
};
