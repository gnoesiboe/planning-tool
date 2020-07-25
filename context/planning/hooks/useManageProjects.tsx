import { AddProjectHandler, EditProjectHandler } from '../PlanningContext';
import {
    fetchAll,
    persist,
    update,
} from '../../../repository/api/projectRepository';
import { ProjectWithItemCount } from '../../../model/planning';
import { notifyError } from '../../../utility/notifier';
import { useState, useEffect } from 'react';
import {
    addProjectToProjects,
    removeProjectFromProjects,
    updateProjectInProjects,
} from '../handler/projectStateMutationHandler';
import useExecuteOnInterval from '../../../hooks/useExecuteOnInterval';

const refetchInterval = 1000 * 60 * 15; // 15 minutes

export default function useManageProjects() {
    const [projects, setProjects] = useState<ProjectWithItemCount[] | null>(
        null
    );

    const doFetchProjects = () => {
        fetchAll()
            .then((projects) => setProjects(projects))
            .catch((error) => {
                notifyError(
                    'Something went wrong while catching the projects. Please refresh the page!'
                );

                console.error(error);
            });
    };

    // fetch periodically to retrieve updates from the backend
    useExecuteOnInterval(() => doFetchProjects(), refetchInterval);

    // fetch on mount
    useEffect(() => doFetchProjects(), []);

    const addProject: AddProjectHandler = async (project) => {
        // update local state
        setProjects((currentProjects) => {
            if (!Array.isArray(currentProjects)) {
                throw new Error(
                    'Expecting projects to be an array at this point'
                );
            }

            return addProjectToProjects(project, currentProjects);
        });

        // persist on server
        try {
            await persist(project);
        } catch (error) {
            setProjects((currentProjects) => {
                if (!Array.isArray(currentProjects)) {
                    throw new Error(
                        'Expecting projects to be an array at this point'
                    );
                }

                notifyError(
                    'Something went wrong while persisting the project. Please try again!'
                );

                return removeProjectFromProjects(project, currentProjects);
            });
        }
    };

    const editProject: EditProjectHandler = async (project) => {
        // update local state
        setProjects((currentProjects) => {
            if (!Array.isArray(currentProjects)) {
                throw new Error(
                    'Expecting projects to be an array at this point'
                );
            }

            return updateProjectInProjects(project, currentProjects);
        });

        // push update to server
        try {
            await update(project);
        } catch (error) {
            notifyError(
                'Something went wrong while persisting the project. Please refresh the page!'
            );
        }
    };

    return { projects: projects || null, addProject, editProject };
}
