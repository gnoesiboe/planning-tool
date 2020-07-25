import { ProjectWithItemCount } from './../../../model/planning.d';
import { OnSubmitValidHandler } from './../../projectForm/hooks/useHandleFormState';
import { usePlanningContext } from '../../../context/planning/PlanningContext';

export default function useUpdateProjectOnValidSubmit(
    project: ProjectWithItemCount,
    onDone: () => void
) {
    const { editProject } = usePlanningContext();

    const onSubmitValid: OnSubmitValidHandler = (values) => {
        const updatedProject: ProjectWithItemCount = {
            ...project,
            ...values,
        };

        editProject(updatedProject);

        onDone();
    };

    return { onSubmitValid };
}
