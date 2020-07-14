import React from 'react';
import LinkButton from '../primities/button/LinkButton';
import useShowHideModal from '../../hooks/useShowHideModal';
import Octicon, { Pencil } from '@primer/octicons-react';
import { Project } from '../../model/planning';
import Modal from '../primities/modal/Modal';
import ProjectForm from '../projectForm/ProjectForm';
import useUpdateProjectOnValidSubmit from './hooks/useUpdateProjectOnValidSubmit';

type Props = {
    project: Project;
};

const EditProject: React.FC<Props> = ({ project }) => {
    const { show, hide, visible } = useShowHideModal();

    const { onSubmitValid } = useUpdateProjectOnValidSubmit(project, () =>
        hide()
    );

    if (visible) {
        return (
            <Modal
                onRequestClose={() => hide()}
                title={`Edit project '${project.name}'`}
            >
                <ProjectForm
                    onCancel={() => hide()}
                    onSubmitValid={onSubmitValid}
                    project={project}
                />
            </Modal>
        );
    }

    return (
        <LinkButton onClick={() => show()}>
            <Octicon icon={Pencil} />
        </LinkButton>
    );
};

export default EditProject;
