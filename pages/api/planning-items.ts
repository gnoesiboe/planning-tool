import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import createController from '../../server/controller/planningItem/createController';
import indexController from '../../server/controller/planningItem/indexController';

const controller = createMultiMethodController({
    [RequestMethod.POST]: createController,
    [RequestMethod.GET]: indexController,
});

export default controller;
