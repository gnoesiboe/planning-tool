import PrimaryButton from '../primities/button/PrimaryButton';
import Octicon, { PlusSmall } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import ProjectForm from './components/ProjectForm';

const AddProject: React.FC = () => {
    const { show, hide, visible } = useShowHideModal();

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()}>
                <h1>Add project</h1>
                <ProjectForm onDone={() => hide()} />
            </Modal>
        );
    }

    return (
        <PrimaryButton className="create-project" onClick={() => show()}>
            <Octicon icon={PlusSmall} /> Add project
        </PrimaryButton>
    );
};

export default AddProject;
