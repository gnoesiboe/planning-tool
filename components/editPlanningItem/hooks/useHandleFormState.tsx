import { FormEventHandler, useState } from 'react';
import { PlanningItem } from '../../../model/planning';
import { usePlanningContext } from '../../../context/planning/PlanningContext';

type FormValues = {
    notes: string;
};

export default function useHandleFormState(
    item: PlanningItem,
    onDone: () => void
) {
    const [values, setValues] = useState<FormValues>({
        notes: item.notes || '',
    });

    const { editPlanningItem } = usePlanningContext();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const newItem = {
            ...item,
            notes: values.notes,
        };

        // validation is not required as notes is not required

        editPlanningItem(newItem);

        onDone();
    };

    const handleFieldChange = (field: keyof FormValues, value: string) => {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }));
    };

    return { handleSubmit, values, handleFieldChange };
}
