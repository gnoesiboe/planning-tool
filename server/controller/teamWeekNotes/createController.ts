import { Controller } from './../../routing/methodSwitch';
import {
    sendValidationErrorResponse,
    sendBadRequestResponse,
} from '../../response/handler/errorResponseHandler';
import { findOneWithId as findTeamWithId } from '../../../repository/database/teamRepository';
import { createTeamWeekNoteFromRequestInput } from '../../../model/factory/teamWeekNoteFactory';
import { persist } from '../../../repository/api/teamWeekNoteRepository';
import { sendCreationSuccessfulResponse } from '../../response/handler/successResponseHandler';
import Joi from '@hapi/joi';
import { getCurrentYear } from '../../../utility/dateTimeUtilities';

const inputSchema = Joi.object({
    id: Joi.string().required(),
    week: Joi.number().required(),
    year: Joi.number().required().min(getCurrentYear()),
    teamId: Joi.string().required(),
    note: Joi.string().required(),
}).required();

export type RequestInput = {
    id: string;
    week: number;
    year: number;
    teamId: string;
    note: string;
};

const createController: Controller = async (request, response) => {
    const { error, value } = inputSchema.validate(request.body);

    if (error) {
        sendValidationErrorResponse(response, error.details);

        return;
    }

    const input: RequestInput = value;

    const team = await findTeamWithId(input.teamId);

    if (!team) {
        sendBadRequestResponse(
            response,
            `No team found with id '${input.teamId}'`
        );

        return;
    }

    const teamWeekNote = createTeamWeekNoteFromRequestInput(input);

    await persist(teamWeekNote);

    sendCreationSuccessfulResponse(response);
};

export default createController;
