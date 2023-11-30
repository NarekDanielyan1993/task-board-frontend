import { useEffect, useRef } from 'react';
import { isDeepEqualArray } from 'src/utills/helper';

const useDeepEqualUseEffect = (
    callback: () => void,
    dependencies: Record<string, unknown>[]
) => {
    const currentDependencies = useRef(dependencies);

    if (!isDeepEqualArray(currentDependencies.current, dependencies)) {
        currentDependencies.current = dependencies;
    }

    useEffect(() => {
        callback();
    }, [currentDependencies.current]);
};

export default useDeepEqualUseEffect;
