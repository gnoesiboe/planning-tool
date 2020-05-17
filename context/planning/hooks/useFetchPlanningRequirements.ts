import { Team, Project } from './../../../model/planning';
import { fetchAll as fetchAllProjects } from '../../../repository/api/projectRepository';
import { fetchAll as fetchAllTeams } from '../../../repository/api/teamRepository';
import { useQuery } from 'react-query';
import { notifyError } from '../../../utility/notifier';

export default function useFetchPlanningRequirements() {
    const { data: projects, error: projectsFetchError } = useQuery<
        Project[] | null,
        string
    >('projects', fetchAllProjects, {
        refetchOnMount: true,
    });

    if (projectsFetchError) {
        notifyError('Something went wrong while fetching projects');
    }

    const { data: teams, error: teamsFetchError } = useQuery<
        Team[] | null,
        string
    >('teams', fetchAllTeams, {
        refetchOnMount: true,
    });

    if (teamsFetchError) {
        notifyError('Something went wrong while fetching teams');
    }

    return {
        teams: teams || null,
        projects: projects || null,
    };
}
