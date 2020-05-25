import { useEffect } from 'react';

export default function useExecuteOnInterval(
    handler: TimerHandler,
    timeout: number,
    deps: any[] = []
) {
    useEffect(() => {
        const handle = setInterval(handler, timeout);

        return () => clearInterval(handle);
    }, deps);
}
