import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { FormEventHandler, useState } from 'react';
import { Team } from './../../../model/planning';
import { createTeamWEekNoteFromFormValues } from '../../../model/factory/teamWeekNoteFactory';

export type FormValues = {
    note: string;
};

type FormErrors = {
    note: string | null;
};

const emptyErrors: FormErrors = {
    note: null,
};

export default function useHandleFormState(
    team: Team,
    week: number,
    year: number,
    onDone: () => void
) {
    const [values, setValues] = useState<FormValues>({
        note: '',
    });

    const [errors, setErrors] = useState<FormErrors>({ ...emptyErrors });

    const { addTeamWeekNote } = usePlanningContext();

    const validateInput = (): boolean => {
        const newErrors: FormErrors = { ...emptyErrors };

        let noErrors = true;

        if (!values.note) {
            newErrors.note = 'This field is required';
            noErrors = false;
        }

        setErrors(newErrors);

        return noErrors;
    };

    const submitForm = () => {
        if (!validateInput()) {
            return;
        }

        addTeamWeekNote(
            createTeamWEekNoteFromFormValues(team, week, year, values)
        );

        onDone();
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        submitForm();
    };

    const handleFieldChange = (field: keyof FormValues, value: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }));
    };

    return { handleSubmit, values, errors, handleFieldChange };
}
