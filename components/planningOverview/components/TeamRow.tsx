import { ReactNode } from 'react';
import { Team } from '../../../model/planning';
import HeightEqualizer from 'react-equalizer';
import styles from '../PlanningOverview.module.scss';

type Props = {
    team: Team;
    children: ReactNode;
};

const TeamRow: React.FC<Props> = ({ children, team }) => (
    <div className={styles.teamRow}>
        <div className={styles.teamRowTitle}>
            <h2>{team.name}</h2>
        </div>
        <HeightEqualizer className={styles.teamRowEqualizer}>
            {children}
        </HeightEqualizer>
    </div>
);

export default TeamRow;
