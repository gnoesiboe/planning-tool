import { useState, FormEventHandler } from 'react';

type FormValues = {
    name: string;
    color: string;
};

type FormErrors = {
    name: string | null;
    color: string | null;
};

const emptyErrors: FormErrors = {
    name: null,
    color: null,
};

export default function useHandleFormState(onDone: () => void) {
    const [values, setValues] = useState<FormValues>({ name: '', color: '' });

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

        // @todo persist
        console.log('@todo persist', values);
    };

    return { values, errors, handleFieldChange, onSubmit };
}
