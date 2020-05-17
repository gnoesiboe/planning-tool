import { TeamWeekNote } from './../../../model/planning';
import { useState, useEffect } from 'react';
import { fetchAll } from '../../../repository/api/teamWeekNoteRepository';
import { notifyError } from '../../../utility/notifier';

export default function useManageTeamWeekNotes() {
    const [teamWeekNotes, setTeamWeekNotes] = useState<TeamWeekNote[] | null>(
        null
    );

    const doFetchTeamWeekNotes = () => {
        fetchAll()
            .then((teamWeekNotes) => setTeamWeekNotes(teamWeekNotes))
            .catch((error) => {
                notifyError(
                    'Something went wrong while catching the team week notes. Please refresh the page!'
                );

                console.error(error);
            });
    };

    useEffect(() => {
        window.addEventListener('focus', doFetchTeamWeekNotes);

        return () => window.removeEventListener('focus', doFetchTeamWeekNotes);
    }, [doFetchTeamWeekNotes]);

    useEffect(() => doFetchTeamWeekNotes(), []);

    return { teamWeekNotes };
}
