import { PlanningItem, Team } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import Octicon, { Pencil } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import EditPlanningItemForm from './components/EditPlanningItemForm';
import { Table } from 'react-bootstrap';

type Props = {
    item: PlanningItem;
    team: Team;
};

const EditPlanningItem: React.FC<Props> = ({ item, team }) => {
    const { show, hide, visible } = useShowHideModal();

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()}>
                <h1>Edit planning item</h1>
                <Table bordered>
                    <tbody>
                        <tr>
                            <th style={{ width: '30%' }}>Week</th>
                            <td>{item.week}</td>
                        </tr>
                        <tr>
                            <th>Team</th>
                            <td>{team.name}</td>
                        </tr>
                    </tbody>
                </Table>

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
