import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { useState, FormEventHandler } from 'react';
import { createProjectFromFormInput } from '../../../model/factory/projectFactory';

export type FormValues = {
    name: string;
    color: string;
    active: boolean;
};

type FormErrors = {
    name: string | null;
    color: string | null;
    active: string | null;
};

const emptyErrors: FormErrors = {
    name: null,
    color: null,
    active: null,
};

export default function useHandleFormState(onDone: () => void) {
    const [values, setValues] = useState<FormValues>({
        name: '',
        color: '',
        active: true,
    });

    const [errors, setErrors] = useState<FormErrors>({ ...emptyErrors });

    const { addProject } = usePlanningContext();

    const handleFieldChange = (key: keyof FormValues, value: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            [key]: value,
        }));
    };

    const validateInput = (): boolean => {
        let noErrors = true;

        const newErrors: FormErrors = { ...emptyErrors };

        if (!values.name) {
            noErrors = false;
            newErrors.name = 'This field is required';
        }

        if (!values.color) {
            noErrors = false;
            newErrors.color = 'This field is required';
        }

        setErrors(newErrors);

        return noErrors;
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (!validateInput()) {
            return;
        }

        const project = createProjectFromFormInput(values);

        addProject(project);

        onDone();
    };

    return { values, errors, handleFieldChange, onSubmit };
}
