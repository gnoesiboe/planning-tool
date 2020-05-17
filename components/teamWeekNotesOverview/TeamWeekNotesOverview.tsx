import { usePlanningContext } from '../../context/planning/PlanningContext';
import { Team } from '../../model/planning';

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
        <div className="team-week-notes-overview">
            <ul className="list-inline">
                {notes.map((note) => (
                    <li>{note.note}</li>
                ))}
            </ul>
        </div>
    );
};

export default TeamWeekNotesOverview;
