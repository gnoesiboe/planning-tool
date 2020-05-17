import { useState } from 'react';

export default function useShowHideModal(initialValue: boolean = false) {
    const [visible, setVisible] = useState<boolean>(initialValue);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const toggle = () => setVisible((current) => !current);

    return { visible, show, hide, toggle };
}
