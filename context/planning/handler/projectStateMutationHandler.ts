import { produce } from 'immer';
import { Project } from './../../../model/planning';

export function addProjectToProjects(
    project: Project,
    currentProjects: Project[]
) {
    return produce<Project[]>(currentProjects, (updatedProjects) => {
        updatedProjects.push(project);

        updatedProjects.sort((first, second) =>
            first.name.localeCompare(second.name)
        );
    });
}

export function removeProjectFromProjects(
    project: Project,
    currentProjects: Project[]
) {
    return produce<Project[]>(currentProjects, (updatedProjects) => {
        return updatedProjects.filter(
            (cursorProject) => cursorProject.id !== project.id
        );
    });
}
