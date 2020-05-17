import { Dropdown } from 'react-bootstrap';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import { Team } from '../../model/planning';
import TeamWeekNoteForm from './components/TeamWeekNoteForm';

type Props = {
    team: Team;
    week: number;
    year: number;
};

const AddTeamWeekNote: React.FC<Props> = ({ team, week, year }) => {
    const { visible, show, hide } = useShowHideModal();

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()}>
                <h1>Weeknotitie toevoegen</h1>
                <TeamWeekNoteForm
                    team={team}
                    week={week}
                    year={year}
                    onDone={() => hide()}
                />
            </Modal>
        );
    }

    return (
        <Dropdown.Item href="#" onClick={() => show()}>
            Notitie
        </Dropdown.Item>
    );
};

export default AddTeamWeekNote;
