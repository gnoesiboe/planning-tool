import { TeamWeekNote } from '../../../model/planning';
import RemoveTeamWeekNote from '../../removeTeamWeekNote/RemoveTeamWeekNote';

type Props = {
    note: TeamWeekNote;
};

const TeamWeekNotesOverviewItem: React.FC<Props> = ({ note }) => (
    <li key={note.id} className="team-week-notes-overview--item">
        <RemoveTeamWeekNote note={note} />
        {note.note}
    </li>
);

export default TeamWeekNotesOverviewItem;
