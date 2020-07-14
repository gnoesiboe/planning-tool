import { useState, FormEventHandler } from 'react';
import { Project } from '../../../model/planning';

export type OnSubmitValidHandler = (values: FormValues) => void;

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

export default function useHandleFormState(
    onSubmitValid: OnSubmitValidHandler,
    project?: Project
) {
    const [values, setValues] = useState<FormValues>({
        name: project?.name || '',
        color: project?.color || '',
        active: project?.active || true,
    });

    const [errors, setErrors] = useState<FormErrors>({ ...emptyErrors });

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

        onSubmitValid(values);
    };

    return { values, errors, handleFieldChange, onSubmit };
}
