import { ProjectWithItemCount } from './../../model/planning.d';
import {
    createGetProjectListUrl,
    createPostProjectUrl,
    createPutProjectUrl,
} from './../../server/routing/urlGenerator';
import { ProjectsResponseBody } from '../../server/response/types';
import { Project } from '../../model/planning';
import {
    executeGetRequest,
    executePostRequest,
    executePutRequest,
} from '../../api/client';

export async function fetchAll(): Promise<ProjectWithItemCount[]> {
    const { projects } = await executeGetRequest<ProjectsResponseBody>(
        createGetProjectListUrl()
    );

    return projects;
}

export async function persist(project: Project): Promise<void> {
    await executePostRequest(createPostProjectUrl(), project);
}

export async function update(project: Project): Promise<void> {
    await executePutRequest(createPutProjectUrl(project.id), {
        name: project.name,
        color: project.color,
        active: project.active,
    });
}
