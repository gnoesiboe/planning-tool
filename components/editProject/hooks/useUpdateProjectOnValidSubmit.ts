import { Project } from './../../../model/planning.d';
import { OnSubmitValidHandler } from './../../projectForm/hooks/useHandleFormState';
import { usePlanningContext } from '../../../context/planning/PlanningContext';

export default function useUpdateProjectOnValidSubmit(
    project: Project,
    onDone: () => void
) {
    const { editProject } = usePlanningContext();

    const onSubmitValid: OnSubmitValidHandler = (values) => {
        const updatedProject: Project = {
            ...project,
            ...values,
        };

        editProject(updatedProject);

        onDone();
    };

    return { onSubmitValid };
}
