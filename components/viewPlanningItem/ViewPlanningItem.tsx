import React from 'react';
import { PlanningItemWithRelations } from '../../model/planning';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import ViewPlanningItemButton from './components/ViewPlanningItemButton';
import { Table } from 'react-bootstrap';
import MarkdownContent from '../primities/MarkdownContent';
import Section from '../primities/section/Section';

type Props = {
    item: PlanningItemWithRelations;
};

const ViewPlanningItem: React.FC<Props> = ({ item }) => {
    const { show, hide, visible } = useShowHideModal(false);

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()} title={item.project.name}>
                <Section>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <th style={{ width: '30%' }}>Period</th>
                                <td>
                                    Week {item.week}, {item.year}
                                </td>
                            </tr>
                            <tr>
                                <th>Team</th>
                                <td>{item.team.name}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Section>
                <Section>
                    {item.notes && (
                        <MarkdownContent>{item.notes}</MarkdownContent>
                    )}
                </Section>
            </Modal>
        );
    }

    return (
        <span className="view-planning-item">
            <ViewPlanningItemButton onClick={() => show()} />
        </span>
    );
};

export default ViewPlanningItem;
