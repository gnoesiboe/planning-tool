import PrimaryButton from '../primities/button/PrimaryButton';
import { PlusIcon } from '@primer/octicons-react';
import useShowHideModal from '../../hooks/useShowHideModal';
import Modal from '../primities/modal/Modal';
import ProjectForm from '../projectForm/ProjectForm';
import usePersistProjectOnValidSubmit from './hooks/usePersistProjectOnValidSubmit';
import styles from './AddProject.module.scss';

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
        <PrimaryButton className={styles.button} onClick={() => show()}>
            <PlusIcon /> Add project
        </PrimaryButton>
    );
};

export default AddProject;
