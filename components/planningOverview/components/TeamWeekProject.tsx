import { Project, PlanningItem } from '../../../model/planning';
import { CSSProperties, ReactNode } from 'react';
import MarkdownContent from '../../primities/MarkdownContent';
import useMakeDraggable from '../hooks/useMakeDraggable';

type Props = {
    project: Project;
    item: PlanningItem;
    children: ReactNode;
};

const TeamWeekProject: React.FC<Props> = ({ project, item, children }) => {
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
            className="planning-overview__team-week-project"
            title={item.notes || ''}
        >
            {children}
            <h3 className="planning-overview__team-week-project__title">
                {project.name}
            </h3>
            {item.notes && (
                <MarkdownContent className="planning-overview__team-week-project__notes">
                    {item.notes}
                </MarkdownContent>
            )}
        </div>
    );
};

export default TeamWeekProject;
