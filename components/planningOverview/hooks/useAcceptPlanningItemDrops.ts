import { usePlanningContext } from './../../../context/planning/PlanningContext';
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
    week: number,
    year: number,
    team: Team,
    onItemDropped: OnItemDroppedHandler
) {
    const { projects } = usePlanningContext();

    const projectIds = projects ? projects.map((project) => project.id) : [];

    const [{ isOver, canDrop }, droppableRef] = useDrop<
        DropObject,
        {},
        DropCollectedProps
    >({
        accept: projectIds, // due to accept not being updated after a drop, we accept all projectIds and notify user when not possible later (@see https://github.com/react-dnd/react-dnd/issues/1877)
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
                  background: '#eee',
              }
            : {};

    return { droppableRef, hoverStyle };
}
