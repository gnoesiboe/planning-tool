import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import indexController from '../../server/controller/project/indexController';
import createController from '../../server/controller/project/createController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: indexController,
    [RequestMethod.POST]: createController,
});

export default controller;
