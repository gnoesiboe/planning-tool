import { MouseEventHandler } from 'react';
import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { TeamWeekNote } from './../../../model/planning';

export default function useRemoveOnClick(note: TeamWeekNote) {
    const { removeTeamWeekNote } = usePlanningContext();

    const onClick: MouseEventHandler = () => {
        if (!confirm('Are you sure?')) {
            return;
        }

        removeTeamWeekNote(note);
    };

    return { onClick };
}
