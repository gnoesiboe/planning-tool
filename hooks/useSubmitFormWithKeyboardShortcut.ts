import { useRef, useEffect } from 'react';

const enterKeycode = 13;

export default function useSubmitFormWithKeyboardShortcut(
    submitForm: () => void
) {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formRef.current) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (
                event.ctrlKey &&
                event.keyCode === enterKeycode &&
                formRef.current
            ) {
                submitForm();
            }
        };

        formRef.current.addEventListener('keydown', onKeyDown);

        return () => formRef.current?.removeEventListener('keydown', onKeyDown);
    }, []);

    return { formRef };
}
