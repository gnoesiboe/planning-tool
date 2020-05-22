import { ProjectsResponseBody } from './../../response/types.d';
import { Controller } from './../../routing/methodSwitch';
import { findAllOrderedByNameAndActiveStatus } from '../../../repository/database/projectRepository';

const indexController: Controller = async (_request, response) => {
    const projects = await findAllOrderedByNameAndActiveStatus();

    const body: ProjectsResponseBody = {
        projects,
    };

    response.statusCode = 200;
    response.json(body);
};

export default indexController;
