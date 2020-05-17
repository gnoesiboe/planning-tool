import { usePlanningContext } from './../../../context/planning/PlanningContext';
import { Team } from './../../../model/planning';
import { useState, FormEventHandler } from 'react';
import { createPlanningItemFromFormValues } from '../../../model/factory/planningItemFactory';

export type FormValues = {
    teamId: string;
    projectId: string;
    notes: string;
};

type FormErrors = {
    teamId: string | null;
    projectId: string | null;
    notes: string | null;
};

const emptyErrors: FormErrors = {
    teamId: null,
    projectId: null,
    notes: null,
};

export default function useHandleFormState(
    week: number,
    year: number,
    team: Team,
    onDone: () => void
) {
    const [values, setValues] = useState<FormValues>({
        teamId: team.id,
        projectId: '',
        notes: '',
    });

    const [errors, setErrors] = useState<FormErrors>({ ...emptyErrors });

    const { addPlanningItem } = usePlanningContext();

    const handleFieldChange = (field: keyof FormValues, value: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }));
    };

    const validateInput = (): boolean => {
        const newErrors: FormErrors = { ...emptyErrors };

        let noErrors = true;

        if (!values.projectId) {
            newErrors.projectId = 'This field is required';
            noErrors = false;
        }

        if (!values.teamId) {
            newErrors.teamId = 'This field is required';
            noErrors = false;
        }

        setErrors(newErrors);

        return noErrors;
    };

    const submitForm = () => {
        if (!validateInput()) {
            return;
        }

        addPlanningItem(createPlanningItemFromFormValues(week, year, values));

        onDone();
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        submitForm();
    };

    return {
        values,
        handleFieldChange,
        errors,
        handleSubmit,
        submitForm,
    };
}
