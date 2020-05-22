import { Controller } from './../../routing/methodSwitch';
import { sendUpdateSuccessResponse } from '../../response/handler/successResponseHandler';
import { sendNotFoundResponse } from '../../response/handler/errorResponseHandler';
import {
    findOneWithId,
    remove,
} from '../../../repository/database/planningItemRepository';
import { strict as assert } from 'assert';

const deleteController: Controller = async (request, response) => {
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

    await remove(item);

    sendUpdateSuccessResponse(response);
};

export default deleteController;
