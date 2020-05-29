import { ReactNode } from 'react';
import useAcceptPlanningItemDrops from '../hooks/useAcceptPlanningItemDrops';
import { Team } from '../../../model/planning';

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

    return (
        <div
            className="planning-overview__week"
            ref={droppableRef}
            style={hoverStyle}
        >
            <h3 className="planning-overview__week__title">{week}</h3>
            {children}
        </div>
    );
};

export default Week;
