import { ProjectsResponseBody } from '../../server/response/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { findAllOrderedByName as findAllProjects } from '../../repository/database/projectRepository';

export default async (_request: NextApiRequest, response: NextApiResponse) => {
    const projects = await findAllProjects();

    const body: ProjectsResponseBody = {
        projects,
    };

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(body));
};
