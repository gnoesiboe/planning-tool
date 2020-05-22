import { Team } from './../../../model/planning';
import { fetchAll as fetchAllTeams } from '../../../repository/api/teamRepository';
import { useQuery } from 'react-query';
import { notifyError } from '../../../utility/notifier';

export default function useFetchPlanningRequirements() {
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
    };
}
