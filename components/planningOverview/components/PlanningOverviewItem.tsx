import { Project, PlanningItemWithRelations } from '../../../model/planning';
import { CSSProperties, ReactNode } from 'react';
import useMakeDraggable from '../hooks/useMakeDraggable';
import Octicon, { Info } from '@primer/octicons-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
    project: Project;
    item: PlanningItemWithRelations;
    children: ReactNode;
};

const PlanningOverviewItem: React.FC<Props> = ({ project, item, children }) => {
    const { draggableRef, styleWhileDragging } = useMakeDraggable(
        item,
        project
    );

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
            title={item.notes || ''}
        >
            {children}
            <h3 className="planning-overview__item__title">{project.name}</h3>
            {item.notes && (
                <OverlayTrigger
                    placement="bottom"
                    delay={0}
                    overlay={
                        <Tooltip id={`tooltip-${item.id}`}>
                            {item.notes}
                        </Tooltip>
                    }
                >
                    <Octicon icon={Info} />
                </OverlayTrigger>
            )}
        </div>
    );
};

export default PlanningOverviewItem;
