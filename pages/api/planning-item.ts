import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import createController from '../../server/controller/planningItem/createController';

const controller = createMultiMethodController({
    [RequestMethod.POST]: createController,
});

export default controller;
