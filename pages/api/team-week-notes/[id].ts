import {
    createMultiMethodController,
    RequestMethod,
} from '../../../server/routing/methodSwitch';
import deleteController from '../../../server/controller/teamWeekNotes/deleteController';

const controller = createMultiMethodController({
    [RequestMethod.DELETE]: deleteController,
});

export default controller;
