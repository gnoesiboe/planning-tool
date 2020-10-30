import { PlanningItemWithRelations } from '../../../model/planning';
import { CSSProperties, ReactNode } from 'react';
import useMakeDraggable from '../hooks/useMakeDraggable';
import { ThreeBarsIcon } from '@primer/octicons-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
    item: PlanningItemWithRelations;
    children: ReactNode;
};

const PlanningOverviewItem: React.FC<Props> = ({ item, children }) => {
    const { draggableRef, styleWhileDragging } = useMakeDraggable(item);

    const { project, notes, id } = item;

    const projectStyle: CSSProperties = {
        backgroundColor: project.color,
    };

    const combinedStyle: CSSProperties = {
        ...styleWhileDragging,
        ...projectStyle,
    };

    return (
        <div
            ref={draggableRef}
            style={combinedStyle}
            className="planning-overview__item"
            title={notes || ''}
        >
            <h3 className="planning-overview__item__title">{project.name}</h3>
            {notes && (
                <OverlayTrigger
                    placement="bottom"
                    delay={0}
                    overlay={<Tooltip id={`tooltip-${id}`}>{notes}</Tooltip>}
                >
                    <ThreeBarsIcon />
                </OverlayTrigger>
            )}
            {children}
        </div>
    );
};

export default PlanningOverviewItem;
