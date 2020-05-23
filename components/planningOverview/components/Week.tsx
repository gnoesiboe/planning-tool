import { ReactNode } from 'react';
import useAcceptPlanningItemDrops from '../hooks/useAcceptPlanningItemDrops';

export type OnItemDroppedHandler = (
    id: string,
    moveToWeek: number,
    moveToYear: number
) => void;

type Props = {
    children: ReactNode;
    week: number;
    year: number;
    acceptDropOfProjectIds: string[];
    onItemDropped: OnItemDroppedHandler;
};

const Week: React.FC<Props> = ({
    children,
    week,
    year,
    acceptDropOfProjectIds,
    onItemDropped,
}) => {
    const { droppableRef, hoverStyle } = useAcceptPlanningItemDrops(
        acceptDropOfProjectIds,
        week,
        year,
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
