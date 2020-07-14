import { OnSubmitValidHandler } from './../../projectForm/hooks/useHandleFormState';
import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { createProjectFromFormInput } from '../../../model/factory/projectFactory';

export default function usePersistProjectOnValidSubmit(onDone: () => void) {
    const { addProject } = usePlanningContext();

    const onSubmitValid: OnSubmitValidHandler = (values) => {
        const project = createProjectFromFormInput(values);

        addProject(project);

        onDone();
    };

    return { onSubmitValid };
}
