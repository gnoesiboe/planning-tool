import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import indexController from '../../server/controller/team/indexController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: indexController,
});

export default controller;
