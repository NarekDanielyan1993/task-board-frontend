const useLocalStorage = () => {
    const setItem = <T>(key: string, value: T) => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    const getItem = (key: string) => {
        if (key) {
            localStorage.getItem(key);
        }
    };

    const removeItem = (key: string) => {
        if (key) {
            localStorage.removeItem(key);
        }
    };

    return { setItem, getItem, removeItem };
};

export default useLocalStorage;
