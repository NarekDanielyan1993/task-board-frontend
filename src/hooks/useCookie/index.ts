import Cookies from 'js-cookie';
import { CookieAttributes } from 'node_modules/@types/js-cookie';
import { useCallback } from 'react';

export default function useCookie() {
    // const [value, setValue] = useState(() => {
    //     const cookie = Cookies.get(name);
    //     if (cookie) return cookie;
    //     Cookies.set(name, defaultValue);
    //     return defaultValue;
    // });

    const setCookie = useCallback(
        (name: string, value: string, options: CookieAttributes) => {
            Cookies.set(name, value, options);
        },
        []
    );

    const getCookie = useCallback((name: string) => {
        return Cookies.get(name);
    }, []);

    // const updateCookie = useCallback(
    //     (name: string, newValue: string, options: CookieAttributes) => {
    //         Cookies.set(name, newValue, options);
    //     },
    //     []
    // );

    const deleteCookie = useCallback((name: string) => {
        Cookies.remove(name);
    }, []);

    return { setCookie, getCookie, deleteCookie };
}
