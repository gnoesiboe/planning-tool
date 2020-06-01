import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import indexController from '../../server/controller/projectBudgetItem/indexController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: indexController,
});

export default controller;
