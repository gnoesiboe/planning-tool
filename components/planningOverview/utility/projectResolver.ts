import { Project } from './../../../model/planning';

export function resolveProjectOrThrow(
    projects: Project[],
    projectId: string
): Project {
    const project = projects.find((project) => project.id === projectId);

    if (!project) {
        throw new Error('Expecting project to be available at this point');
    }

    return project;
}
