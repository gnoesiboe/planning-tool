import { Controller } from './../../routing/methodSwitch';
import Joi from '@hapi/joi';
import { sendValidationErrorResponse } from '../../response/handler/errorResponseHandler';
import { createProjectFromRequestInput } from '../../../model/factory/projectFactory';
import { persist } from '../../../repository/database/projectRepository';
import { sendCreationSuccessfulResponse } from '../../response/handler/successResponseHandler';

const inputSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    color: Joi.string().required(),
    active: Joi.boolean().required(),
}).required();

export type RequestBody = {
    id: string;
    name: string;
    color: string;
    active: boolean;
};

const createController: Controller = async (request, response) => {
    const { error, value } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: RequestBody = value;

    const project = createProjectFromRequestInput(input);

    await persist(project);

    sendCreationSuccessfulResponse(response);
};

export default createController;
