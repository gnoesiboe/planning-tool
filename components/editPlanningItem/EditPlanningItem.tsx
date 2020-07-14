import { PlanningItemWithRelations } from '../../model/planning';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import EditPlanningItemForm from './components/EditPlanningItemForm';
import { Table } from 'react-bootstrap';
import Section from '../primities/section/Section';

type Props = {
    item: PlanningItemWithRelations;
    renderButton: (onClick: () => void) => JSX.Element;
};

const EditPlanningItem: React.FC<Props> = ({ item, renderButton }) => {
    const { show, hide, visible } = useShowHideModal();

    return (
        <span className="edit-planning-item">
            {visible ? (
                <Modal onRequestClose={() => hide()} title="Edit planning item">
                    <Section>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th style={{ width: '30%' }}>Week</th>
                                    <td>{item.week}</td>
                                </tr>
                                <tr>
                                    <th>Team</th>
                                    <td>{item.team.name}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Section>

                    <Section>
                        <EditPlanningItemForm
                            item={item}
                            onDone={() => hide()}
                        />
                    </Section>
                </Modal>
            ) : (
                renderButton(() => show())
            )}
        </span>
    );
};

export default EditPlanningItem;
