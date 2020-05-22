import { Controller } from './../../routing/methodSwitch';
import {
    findOneWithId,
    remove,
} from '../../../repository/database/teamWeekNoteRepository';
import { strict as assert } from 'assert';
import { sendNotFoundResponse } from '../../response/handler/errorResponseHandler';
import { sendUpdateSuccessResponse } from '../../response/handler/successResponseHandler';

const deleteController: Controller = async (request, response) => {
    const {
        query: { id },
    } = request;

    assert.ok(typeof id === 'string');

    const item = await findOneWithId(id);

    if (!item) {
        sendNotFoundResponse(
            response,
            `No team week note found with id: '${id}'`
        );

        return;
    }

    await remove(item);

    sendUpdateSuccessResponse(response);
};

export default deleteController;
