import { PlanningItem } from './../../../model/planning';
import { Controller } from './../../routing/methodSwitch';
import { strict as assert } from 'assert';
import {
    findOneWithId,
    update,
} from '../../../repository/database/planningItemRepository';
import {
    sendNotFoundResponse,
    sendValidationErrorResponse,
} from '../../response/handler/errorResponseHandler';
import Joi from '@hapi/joi';
import { sendUpdateSuccessResponse } from '../../response/handler/successResponseHandler';
import { getCurrentYear } from '../../../utility/dateTimeUtilities';

const inputSchema = Joi.object({
    notes: Joi.string().allow(null),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
}).required();

export type RequestBody = {
    notes: string;
    week: number;
    year: number;
};

const updateController: Controller = async (request, response) => {
    const {
        query: { id },
    } = request;

    assert.ok(typeof id === 'string');

    const item = await findOneWithId(id);

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

    const newItem: PlanningItem = { ...item, ...input };

    await update(newItem);

    sendUpdateSuccessResponse(response);
};

export default updateController;
