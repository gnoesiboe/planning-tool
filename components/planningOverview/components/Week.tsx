import { ReactNode } from 'react';
import useAcceptPlanningItemDrops from '../hooks/useAcceptPlanningItemDrops';
import { Team } from '../../../model/planning';
import {
    getStartOfWeek,
    getEndOfWeek,
    formatShortDate,
} from '../../../utility/dateTimeUtilities';

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

    return (
        <div
            className="planning-overview__week"
            ref={droppableRef}
            style={hoverStyle}
        >
            <h3 className="planning-overview__week__title">{week}</h3>
            <div className="planning-overview__week__period">
                {formatShortDate(startDate)} - {formatShortDate(endDate)}
            </div>
            {children}
        </div>
    );
};

export default Week;
