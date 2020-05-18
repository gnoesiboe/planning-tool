import { createGetProjectListUrl } from './../../server/routing/urlGenerator';
import { ProjectsResponseBody } from '../../server/response/types';
import { Project } from '../../model/planning';
import { executeGetRequest } from '../../api/client';

export async function fetchAll(): Promise<Project[]> {
    const { projects } = await executeGetRequest<ProjectsResponseBody>(
        createGetProjectListUrl()
    );

    return projects;
}
