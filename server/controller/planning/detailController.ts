import { Planning } from './../../../model/planning';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';
import { sendPlanningListResponse } from '../../response/handler/planningResponseHandler';

const detailController: Controller = async (_request, response) => {
    const planningItems = await findAllUpcoming();

    const planning: Planning = {};

    planningItems.forEach((planningItem) => {
        const week = planningItem.week;

        if (typeof planning[week] === 'undefined') {
            planning[week] = [];
        }

        planning[week].push(planningItem);
    });

    sendPlanningListResponse(response, planning);
};

export default detailController;
