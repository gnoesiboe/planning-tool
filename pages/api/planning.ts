import { RequestMethod } from './../../server/routing/methodSwitch';
import { createMultiMethodController } from '../../server/routing/methodSwitch';
import detailController from '../../server/controller/planning/detailController';

const controller = createMultiMethodController({
    [RequestMethod.GET]: detailController,
});

export default controller;
