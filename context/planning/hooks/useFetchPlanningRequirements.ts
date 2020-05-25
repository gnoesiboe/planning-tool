import { Team } from './../../../model/planning';
import { fetchAll as fetchAllTeams } from '../../../repository/api/teamRepository';
import { useQuery } from 'react-query';
import { notifyError } from '../../../utility/notifier';

export default function useFetchPlanningRequirements() {
    const { data: teams, error: error } = useQuery<Team[] | null, string>(
        'teams',
        fetchAllTeams,
        {
            refetchOnMount: false,
        }
    );

    if (error) {
        notifyError('Something went wrong while fetching teams');

        console.error(error);
    }

    return {
        teams: teams || null,
    };
}
