import { toast } from 'react-toastify';

export function notifySuccess(message: string) {
    toast.success(message);
}

export function notifyError(message: string) {
    toast.error(message);
}
