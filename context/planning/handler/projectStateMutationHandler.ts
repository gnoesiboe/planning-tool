import { produce } from 'immer';
import { Project } from './../../../model/planning';

export function addProjectToProjects(
    project: Project,
    currentProjects: Project[]
) {
    return produce<Project[]>(currentProjects, (updatedProjects) => {
        updatedProjects.push(project);

        // make sure that inactive projects go last and otherwise are sorted by name
        updatedProjects.sort((first, second) => {
            if (first.active === false) {
                return -1;
            }

            if (second.active === false) {
                return 1;
            }

            return first.name.localeCompare(second.name);
        });
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
