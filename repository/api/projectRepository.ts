import { ProjectsResponseBody } from '../../server/response/types';
import { Project } from '../../model/planning';

export async function fetchAll(): Promise<Project[]> {
    // @todo replace host with environment variable
    const response = await fetch('http://localhost:3000/api/projects');

    const { projects } = (await response.json()) as ProjectsResponseBody;

    return projects;
}
