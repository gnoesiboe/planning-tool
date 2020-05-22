import { RequestMethod } from './../../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../../server/routing/methodSwitch';
import updateController from '../../../server/controller/project/updateController';

const controller = createMultiMethodController({
    [RequestMethod.PUT]: updateController,
});

export default controller;
