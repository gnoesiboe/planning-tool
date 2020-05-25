import {
    RemoveTeamWeekNoteHandler,
    AddTeamWeekNoteHandler,
} from './../PlanningContext';
import { TeamWeekNote } from './../../../model/planning';
import { useState, useEffect } from 'react';
import {
    fetchAll,
    remove,
    persist,
} from '../../../repository/api/teamWeekNoteRepository';
import { notifyError } from '../../../utility/notifier';
import {
    removeNoteFromTeamWeekNotes,
    addNoteToTeamWeekNotes,
} from '../handler/teamWeekNoteStatesMutationHandler';
import useExecuteOnInterval from '../../../hooks/useExecuteOnInterval';

const refetchInterval = 1000 * 60 * 15; // 15 minutes

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

    // fetch periodically to fetch updates from the backend
    useExecuteOnInterval(() => doFetchTeamWeekNotes(), refetchInterval);

    // fetch on mount
    useEffect(() => doFetchTeamWeekNotes(), []);

    const removeTeamWeekNote: RemoveTeamWeekNoteHandler = async (
        noteToRemove
    ) => {
        // remove from local state
        setTeamWeekNotes((currentNotes) => {
            if (!Array.isArray(currentNotes)) {
                throw new Error(
                    'Expecting team week notes to be available at this point'
                );
            }

            return removeNoteFromTeamWeekNotes(currentNotes, noteToRemove);
        });

        // remove from server
        try {
            await remove(noteToRemove);
        } catch (error) {
            notifyError(
                'Something went wrong while removing the note on the server. Please refresh the page!'
            );
        }
    };

    const addTeamWeekNote: AddTeamWeekNoteHandler = async (
        note: TeamWeekNote
    ) => {
        // update local state
        setTeamWeekNotes((currentNotes) => {
            if (!Array.isArray(currentNotes)) {
                throw new Error(
                    'Expecting current notes to be available at this point'
                );
            }

            return addNoteToTeamWeekNotes(currentNotes, note);
        });

        // remove from server
        try {
            await persist(note);
        } catch (error) {
            notifyError(
                'Somethign went wrong while persisting the note on the server.'
            );

            setTeamWeekNotes((currentNotes) => {
                if (!Array.isArray(currentNotes)) {
                    throw new Error(
                        'Expecting current notes to be available at this point'
                    );
                }

                return removeNoteFromTeamWeekNotes(currentNotes, note);
            });
        }
    };

    return { teamWeekNotes, addTeamWeekNote, removeTeamWeekNote };
}
