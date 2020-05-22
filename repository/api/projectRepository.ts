import {
    createGetProjectListUrl,
    createPostProjectUrl,
} from './../../server/routing/urlGenerator';
import { ProjectsResponseBody } from '../../server/response/types';
import { Project } from '../../model/planning';
import { executeGetRequest, executePostRequest } from '../../api/client';

export async function fetchAll(): Promise<Project[]> {
    const { projects } = await executeGetRequest<ProjectsResponseBody>(
        createGetProjectListUrl()
    );

    return projects;
}

export async function persist(project: Project): Promise<void> {
    await executePostRequest(createPostProjectUrl(), project);
}
