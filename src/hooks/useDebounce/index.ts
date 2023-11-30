import { useEffect } from 'react';
import useTimeout from '../useTimeout';

const useDebounce = (
    func: () => void,
    delay: number,
    dependencies: unknown[]
) => {
    const { clear, reset } = useTimeout(func, delay);
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, []);
};

export default useDebounce;
