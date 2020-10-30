import { ReactNode } from 'react';
import useAcceptPlanningItemDrops from '../hooks/useAcceptPlanningItemDrops';
import { Team } from '../../../model/planning';
import {
    getStartOfWeek,
    getEndOfWeek,
    formatShortDateWithoutYear,
    getCurrentWeek,
    getCurrentYear,
} from '../../../utility/dateTimeUtilities';
import createClassName from 'classnames';
import styles from '../PlanningOverview.module.scss';

export type OnItemDroppedHandler = (
    id: string,
    newWeek: number,
    newYear: number,
    newTeamId: string
) => void;

type Props = {
    children: ReactNode;
    week: number;
    year: number;
    team: Team;
    onItemDropped: OnItemDroppedHandler;
};

const Week: React.FC<Props> = ({
    children,
    week,
    year,
    team,
    onItemDropped,
}) => {
    const { droppableRef, hoverStyle } = useAcceptPlanningItemDrops(
        week,
        year,
        team,
        onItemDropped
    );

    const startDate = getStartOfWeek({ week, year });
    const endDate = getEndOfWeek({ week, year });

    const className = createClassName(styles.week, {
        [styles['week--current']]:
            getCurrentWeek() === week && getCurrentYear() === year,
    });

    return (
        <div className={className} ref={droppableRef} style={hoverStyle}>
            <h3 className={styles.weekTitle}>{week}</h3>
            <div className={styles.weekPeriod}>
                {formatShortDateWithoutYear(startDate)} -{' '}
                {formatShortDateWithoutYear(endDate)}
            </div>
            {children}
        </div>
    );
};

export default Week;
