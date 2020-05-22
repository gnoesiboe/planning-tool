import { Project } from './../../../model/planning';
import { Controller } from './../../routing/methodSwitch';
import {
    sendValidationErrorResponse,
    sendNotFoundResponse,
} from '../../response/handler/errorResponseHandler';
import Joi from '@hapi/joi';
import { strict as assert } from 'assert';
import {
    findOneWithId,
    update,
} from '../../../repository/database/projectRepository';
import { sendUpdateSuccessResponse } from '../../response/handler/successResponseHandler';

const inputSchema = Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
}).required();

type RequestBody = {
    name: string;
    color: string;
};

const updateController: Controller = async (request, response) => {
    const {
        query: { id },
    } = request;

    assert.ok(typeof id === 'string');

    const project = await findOneWithId(id);

    if (!project) {
        sendNotFoundResponse(response, `No project found with id '${id}'`);

        return;
    }

    const { error, value } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: RequestBody = value;

    const updatedProject: Project = {
        ...project,
        ...input,
    };

    await update(updatedProject);

    return sendUpdateSuccessResponse(response);
};

export default updateController;
