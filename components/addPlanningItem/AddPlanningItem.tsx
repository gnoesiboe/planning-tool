import useShowHideModal from '../../hooks/useShowHideModal';
import AddPlanningItemForm from './components/AddPlanningItemForm';
import { Team, PlanningItem } from '../../model/planning';
import Modal from '../primities/modal/Modal';
import { Dropdown } from 'react-bootstrap';

type Props = {
    week: number;
    year: number;
    team: Team;
    currentPlanningItems: PlanningItem[];
};

const AddPlanningItem: React.FC<Props> = ({
    week,
    year,
    team,
    currentPlanningItems,
}) => {
    const { visible, show, hide } = useShowHideModal();

    const disabledProjectIds = currentPlanningItems.map(
        (item) => item.projectId
    );

    if (visible) {
        return (
            <Modal
                onRequestClose={() => hide()}
                title={`Planning item toevoegen - Week ${week}`}
            >
                <AddPlanningItemForm
                    week={week}
                    year={year}
                    onDone={() => hide()}
                    team={team}
                    disabledProjectIds={disabledProjectIds}
                />
            </Modal>
        );
    }

    return (
        <Dropdown.Item href="#" onClick={() => show()}>
            Planning item
        </Dropdown.Item>
    );
};

export default AddPlanningItem;
