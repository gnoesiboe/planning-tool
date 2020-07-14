import { OnSubmitValidHandler } from './../../projectForm/hooks/useHandleFormState';

export default function useUpdateProjectOnValidSubmit() {
    const onSubmitValid: OnSubmitValidHandler = (values) => {
        console.log('submit', values);
    };

    return { onSubmitValid };
}
