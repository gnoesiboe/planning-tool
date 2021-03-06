import { PlanningItemWithRelations } from './../../../model/planning.d';
import { useDrag, DragObjectWithType } from 'react-dnd';
import { CSSProperties } from 'react';

export interface DropObject extends DragObjectWithType {
    id: string;
    name: 'planning_item';
}

type DropCollectedProps = {
    opacity: number;
};

export default function useMakeDraggable(item: PlanningItemWithRelations) {
    const [{ opacity }, draggableRef] = useDrag<
        DropObject,
        {},
        DropCollectedProps
    >({
        item: { name: 'planning_item', id: item.id, type: item.project.id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });

    const styleWhileDragging: CSSProperties = { opacity };

    return { draggableRef, styleWhileDragging };
}
