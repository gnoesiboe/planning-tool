import { PlanningItem } from './../../../model/planning';
import { Controller } from './../../routing/methodSwitch';
import { strict as assert } from 'assert';
import {
    findOneWithId as findPlanningItemWithId,
    update,
} from '../../../repository/database/planningItemRepository';
import {
    sendNotFoundResponse,
    sendValidationErrorResponse,
    sendBadRequestResponse,
} from '../../response/handler/errorResponseHandler';
import Joi from '@hapi/joi';
import { sendUpdateSuccessResponse } from '../../response/handler/successResponseHandler';
import { getCurrentYear } from '../../../utility/dateTimeUtilities';
import { findOneWithId as findTeamWithId } from '../../../repository/database/teamRepository';

const inputSchema = Joi.object({
    notes: Joi.string().allow(null),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
    teamId: Joi.string().required(),
}).required();

export type RequestBody = {
    notes: string;
    week: number;
    year: number;
    teamId: string;
};

const updateController: Controller = async (request, response) => {
    const {
        query: { id },
    } = request;

    assert.ok(typeof id === 'string');

    const item = await findPlanningItemWithId(id);

    if (!item) {
        sendNotFoundResponse(
            response,
            `No planning item found with id: '${id}'`
        );

        return;
    }

    const { value, error } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: RequestBody = value;

    const team = await findTeamWithId(input.teamId);

    if (!team) {
        sendBadRequestResponse(
            response,
            `No team found with id '${input.teamId}'`
        );

        return;
    }

    const newItem: PlanningItem = { ...item, ...input };

    await update(newItem);

    sendUpdateSuccessResponse(response);
};

export default updateController;
