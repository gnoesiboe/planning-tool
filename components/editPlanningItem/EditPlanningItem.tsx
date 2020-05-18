import { PlanningItem } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import Octicon, { Pencil } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import EditPlanningItemForm from './components/EditPlanningItemForm';

type Props = {
    item: PlanningItem;
};

const EditPlanningItem: React.FC<Props> = ({ item }) => {
    const { show, hide, visible } = useShowHideModal();

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()}>
                <EditPlanningItemForm item={item} onDone={() => hide()} />
            </Modal>
        );
    }

    return (
        <LinkButton className="edit-planning-item" onClick={() => show()}>
            <Octicon icon={Pencil} />
        </LinkButton>
    );
};

export default EditPlanningItem;
