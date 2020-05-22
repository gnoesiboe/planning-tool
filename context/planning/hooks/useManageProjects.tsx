import { AddProjectHandler } from '../PlanningContext';
import { fetchAll, persist } from '../../../repository/api/projectRepository';
import { Project } from '../../../model/planning';
import { notifyError } from '../../../utility/notifier';
import { useState, useEffect } from 'react';
import {
    addProjectToProjects,
    removeProjectFromProjects,
} from '../handler/projectStateMutationHandler';

export default function useManageProjects() {
    const [projects, setProjects] = useState<Project[] | null>(null);

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

    useEffect(() => {
        window.addEventListener('focus', doFetchProjects);

        return () => window.removeEventListener('focus', doFetchProjects);
    }, [doFetchProjects]);

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

    return { projects: projects || null, addProject };
}
