import { Team } from './../../../model/planning';
import { OnItemDroppedHandler } from './../components/Week';
import { useDrop } from 'react-dnd';
import { DropObject } from './useMakeDraggable';
import { CSSProperties } from 'react';

type DropCollectedProps = {
    isOver: boolean;
    canDrop: boolean;
};

export default function useAcceptPlanningItemDrops(
    acceptDropOfProjectIds: string[],
    week: number,
    year: number,
    team: Team,
    onItemDropped: OnItemDroppedHandler
) {
    const [{ isOver, canDrop }, droppableRef] = useDrop<
        DropObject,
        {},
        DropCollectedProps
    >({
        accept: acceptDropOfProjectIds,
        drop: ({ id }) => {
            onItemDropped(id, week, year, team.id);

            return undefined;
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const hoverStyle: CSSProperties =
        isOver && canDrop
            ? {
                  background: 'rgba(0, 100, 0, 0.2)',
              }
            : {};

    return { droppableRef, hoverStyle };
}
