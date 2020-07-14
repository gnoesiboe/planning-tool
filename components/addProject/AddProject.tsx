import PrimaryButton from '../primities/button/PrimaryButton';
import Octicon, { PlusSmall } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import ProjectForm from '../projectForm/ProjectForm';
import usePersistProjectOnValidSubmit from './hooks/usePersistProjectOnValidSubmit';

const AddProject: React.FC = () => {
    const { show, hide, visible } = useShowHideModal();

    const { onSubmitValid } = usePersistProjectOnValidSubmit(() => hide());

    if (visible) {
        return (
            <Modal onRequestClose={() => hide()} title="Add project">
                <ProjectForm
                    onSubmitValid={onSubmitValid}
                    onCancel={() => hide()}
                />
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
