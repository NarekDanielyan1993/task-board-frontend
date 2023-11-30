import { useEffect, useState } from 'react';

const useOnScreen = (
    ref: React.RefObject<HTMLElement | null>,
    rootMargin: string | '1rem'
) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const options: IntersectionObserverInit = {
            rootMargin,
        };
        const observer = new IntersectionObserver(([entry]) => {
            return setIsVisible(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current === null) return;
            observer.unobserve(ref.current);
        };
    }, []);
    return isVisible;
};

export default useOnScreen;
