import {
    createMultiMethodController,
    RequestMethod,
} from '../../../server/routing/methodSwitch';
import deleteController from '../../../server/controller/planningItem/deleteController';
import updateController from '../../../server/controller/planningItem/updateController';

const controller = createMultiMethodController({
    [RequestMethod.DELETE]: deleteController,
    [RequestMethod.PUT]: updateController,
});

export default controller;
