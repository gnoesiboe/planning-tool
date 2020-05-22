import {
    createMultiMethodController,
    RequestMethod,
} from '../../server/routing/methodSwitch';
import indexController from '../../server/controller/teamWeekNotes/indexController';
import createController from '../../server/controller/teamWeekNotes/createController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: indexController,
    [RequestMethod.POST]: createController,
});

export default controller;
