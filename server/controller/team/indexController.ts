import { TeamsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllOrderedByName } from '../../../repository/database/teamRepository';

const indexController: Controller = async (_request, response) => {
    const teams = await findAllOrderedByName();

    const body: TeamsResponseBody = { teams };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
