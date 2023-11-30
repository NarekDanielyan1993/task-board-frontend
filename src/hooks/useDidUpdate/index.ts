import { useEffect, useRef } from 'react';

const useDidUpdate = (callback: () => void, dependencies: unknown[]) => {
    const isMount = useRef(true);
    useEffect(() => {
        console.log(888);
        if (isMount.current) {
            isMount.current = false;
            return;
        }
        callback();
    }, dependencies);
};

export default useDidUpdate;
