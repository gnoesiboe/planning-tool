import { TeamWeekNote } from '../../../model/planning';
import RemoveTeamWeekNote from '../../removeTeamWeekNote/RemoveTeamWeekNote';
import styles from '../TeamWeekNotesOverview.module.scss';

type Props = {
    note: TeamWeekNote;
};

const TeamWeekNotesOverviewItem: React.FC<Props> = ({ note }) => (
    <li key={note.id} className={styles.item}>
        <div className={styles.removeButtonWrapper}>
            <RemoveTeamWeekNote note={note} />
        </div>
        {note.note}
    </li>
);

export default TeamWeekNotesOverviewItem;
