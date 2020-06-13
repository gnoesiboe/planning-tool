import { Project, PlanningItemWithRelations } from '../../../model/planning';
import { CSSProperties, ReactNode } from 'react';
import MarkdownContent from '../../primities/MarkdownContent';
import useMakeDraggable from '../hooks/useMakeDraggable';
import useShowHideModal from '../../../hooks/useShowHideModal';
import PlanningItemDetail from '../../planningItemDetail/PlanningItemDetail';
import Modal from '../../primities/modal/Modal';

type Props = {
    project: Project;
    item: PlanningItemWithRelations;
    children: ReactNode;
};

const PlanningOverviewItem: React.FC<Props> = ({ project, item, children }) => {
    const {
        visible: detailsVisible,
        show: showDetails,
        hide: hideDetails,
    } = useShowHideModal(false);

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
        <>
            <a
                ref={draggableRef}
                style={combinedStyle}
                className="planning-overview__item"
                title={item.notes || ''}
                onClick={() => showDetails()}
            >
                {children}
                <h3 className="planning-overview__item__title">
                    {project.name}
                </h3>
                {item.notes && (
                    <MarkdownContent className="planning-overview__item__notes">
                        {item.notes}
                    </MarkdownContent>
                )}
            </a>
            {detailsVisible && (
                <Modal onRequestClose={() => hideDetails()}>
                    <PlanningItemDetail item={item} />
                </Modal>
            )}
        </>
    );
};

export default PlanningOverviewItem;
