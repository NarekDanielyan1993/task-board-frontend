import { useEffect, useRef } from 'react';

const useEventListener = <T extends keyof WindowEventMap>(
    eventType: T,
    callback: (e: WindowEventMap[T]) => void,
    element = window
) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = (e: WindowEventMap[T]) => callbackRef.current(e);
        element.addEventListener(eventType, handler);
        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
};

export default useEventListener;
