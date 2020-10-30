import { usePlanningContext } from '../../context/planning/PlanningContext';
import { Team } from '../../model/planning';
import TeamWeekNotesOverviewItem from './components/TeamWeekNotesOverviewItem';
import styles from './TeamWeekNotesOverview.module.scss';

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
        <ul className={styles.wrapper}>
            {notes.map((note) => (
                <TeamWeekNotesOverviewItem note={note} key={note.id} />
            ))}
        </ul>
    );
};

export default TeamWeekNotesOverview;
