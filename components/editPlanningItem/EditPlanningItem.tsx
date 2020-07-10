import { PlanningItem, Team } from '../../model/planning';
import LinkButton from '../primities/button/LinkButton';
import Octicon, { Pencil } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import EditPlanningItemForm from './components/EditPlanningItemForm';
import { Table } from 'react-bootstrap';
import Section from '../primities/section/Section';

type Props = {
    item: PlanningItem;
    team: Team;
};

const EditPlanningItem: React.FC<Props> = ({ item, team }) => {
    const { show, hide, visible } = useShowHideModal();

    if (visible) {
        return (
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
                                <td>{team.name}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>

                <Section>
                    <EditPlanningItemForm item={item} onDone={() => hide()} />
                </Section>
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
