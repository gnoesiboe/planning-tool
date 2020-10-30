import { TeamWeekNote } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import useRemoveOnClick from './hooks/useRemoveOnClick';
import styles from './RemoveTeamWeekNote.module.scss';

type Props = {
    note: TeamWeekNote;
};

const RemoveTeamWeekNote: React.FC<Props> = ({ note }) => {
    const { onClick } = useRemoveOnClick(note);

    return (
        <LinkButton onClick={onClick} className={styles.button}>
            x
        </LinkButton>
    );
};

export default RemoveTeamWeekNote;
