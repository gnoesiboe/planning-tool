import Octicon, { Plus } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import PlanningItemForm from './components/PlanningItemForm';
import { Team, PlanningItem } from '../../model/planning';
import Modal from '../primities/modal/Modal';

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

    return (
        <span className="add-planning-item">
            {visible ? (
                <Modal onRequestClose={() => hide()}>
                    <h1>{`Planning item toevoegen - Week ${week}`}</h1>
                    <PlanningItemForm
                        week={week}
                        year={year}
                        onDone={() => hide()}
                        team={team}
                        disabledProjectIds={disabledProjectIds}
                    />
                </Modal>
            ) : (
                <button
                    className="btn add-planning-item__button"
                    onClick={() => show()}
                >
                    <Octicon icon={Plus} />
                </button>
            )}
        </span>
    );
};

export default AddPlanningItem;
