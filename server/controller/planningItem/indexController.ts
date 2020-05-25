import { PlanningItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllUpcoming } from '../../../repository/database/planningItemRepository';

const indexController: Controller = async (_request, response) => {
    const planningItems = await findAllUpcoming();

    const body: PlanningItemsResponseBody = { planningItems };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
