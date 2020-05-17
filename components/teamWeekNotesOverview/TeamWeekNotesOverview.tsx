import { usePlanningContext } from '../../context/planning/PlanningContext';
import { Team } from '../../model/planning';
import RemoveTeamWeekNote from '../removeTeamWeekNote/RemoveTeamWeekNote';

type Props = {
    week: number;
    team: Team;
};

const TeamWeekNotesOverview: React.FC<Props> = ({ team, week }) => {
    const { teamWeekNotes } = usePlanningContext();

    if (!teamWeekNotes) {
        return null;
    }

    const notes = teamWeekNotes.filter(
        (teamWeekNote) =>
            teamWeekNote.week === week && teamWeekNote.teamId === team.id
    );

    return (
        <ul className="team-week-notes-overview">
            {notes.map((note) => (
                <li key={note.id} className="team-week-notes-overview--item">
                    <RemoveTeamWeekNote note={note} />
                    {note.note}
                </li>
            ))}
        </ul>
    );
};

export default TeamWeekNotesOverview;
