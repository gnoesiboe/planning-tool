import { Controller } from '../../routing/methodSwitch';
import Joi from '@hapi/joi';
import { getCurrentYear } from '../../../utility/dateTimeUtilities';
import {
    sendValidationErrorResponse,
    sendBadRequestResponse,
} from '../../response/handler/errorResponseHandler';
import { findOneWithId as findProject } from '../../../repository/database/projectRepository';
import { findOneWithId as findTeam } from '../../../repository/database/teamRepository';
import { createPlanningItemFromRequestInput } from '../../../model/factory/planningItemFactory';
import { persist } from '../../../repository/database/planningItemRepository';
import { sendCreationSuccessfulResponse } from '../../response/handler/successResponseHandler';

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

const createController: Controller = async (request, response) => {
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

export default createController;
