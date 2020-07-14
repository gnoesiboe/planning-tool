import { produce } from 'immer';
import { Project } from './../../../model/planning';

// make sure that inactive projects go last and otherwise are sorted by name
const sortProjects = (first: Project, second: Project) => {
    if (first.active === false) {
        return 1;
    }

    if (second.active === false) {
        return -1;
    }

    return first.name.localeCompare(second.name);
};

export function addProjectToProjects(
    project: Project,
    currentProjects: Project[]
) {
    return produce<Project[]>(currentProjects, (updatedProjects) => {
        updatedProjects.push(project);
        updatedProjects.sort(sortProjects);
    });
}

export function updateProjectInProjects(
    updatedProject: Project,
    currentProjects: Project[]
) {
    return produce<Project[]>(currentProjects, (updatedProjects) => {
        return updatedProjects
            .map((cursorProject) =>
                cursorProject.id === updatedProject.id
                    ? updatedProject
                    : cursorProject
            )
            .sort(sortProjects);
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
