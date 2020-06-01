import { ProjectBudgetItemsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { fetchAll } from '../../../repository/database/projectBudgetItemRepository';

const indexController: Controller = async (_request, response) => {
    const items = await fetchAll();

    const body: ProjectBudgetItemsResponseBody = {
        projectBudgetItems: items,
    };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
