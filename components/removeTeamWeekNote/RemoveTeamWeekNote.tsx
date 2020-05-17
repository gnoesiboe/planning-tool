import { TeamWeekNote } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import useRemoveOnClick from './hooks/useRemoveOnClick';

type Props = {
    note: TeamWeekNote;
};

const RemoveTeamWeekNote: React.FC<Props> = ({ note }) => {
    const { onClick } = useRemoveOnClick(note);

    return (
        <LinkButton onClick={onClick} className="remove-team-week-note">
            x
        </LinkButton>
    );
};

export default RemoveTeamWeekNote;
