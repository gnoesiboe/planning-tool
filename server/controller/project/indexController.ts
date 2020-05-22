import { ProjectsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllOrderedByName } from '../../../repository/database/projectRepository';

const indexController: Controller = async (_request, response) => {
    const projects = await findAllOrderedByName();

    const body: ProjectsResponseBody = {
        projects,
    };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
