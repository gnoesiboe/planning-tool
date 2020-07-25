import { ProjectWithItemCount } from './../../../model/planning';
import { produce } from 'immer';

// make sure that inactive projects go last and otherwise are sorted by name
const sortProjects = (
    first: ProjectWithItemCount,
    second: ProjectWithItemCount
) => {
    if (first.active === false) {
        return 1;
    }

    if (second.active === false) {
        return -1;
    }

    return first.name.localeCompare(second.name);
};

export function addProjectToProjects(
    project: ProjectWithItemCount,
    currentProjects: ProjectWithItemCount[]
) {
    return produce<ProjectWithItemCount[]>(
        currentProjects,
        (updatedProjects) => {
            updatedProjects.push(project);
            updatedProjects.sort(sortProjects);
        }
    );
}

export function updateProjectInProjects(
    updatedProject: ProjectWithItemCount,
    currentProjects: ProjectWithItemCount[]
) {
    return produce<ProjectWithItemCount[]>(
        currentProjects,
        (updatedProjects) => {
            return updatedProjects
                .map((cursorProject) =>
                    cursorProject.id === updatedProject.id
                        ? updatedProject
                        : cursorProject
                )
                .sort(sortProjects);
        }
    );
}

export function removeProjectFromProjects(
    project: ProjectWithItemCount,
    currentProjects: ProjectWithItemCount[]
) {
    return produce<ProjectWithItemCount[]>(
        currentProjects,
        (updatedProjects) => {
            return updatedProjects.filter(
                (cursorProject) => cursorProject.id !== project.id
            );
        }
    );
}
