function useLocalStorage<T>(key: string) {
    if (typeof window === 'undefined') {
        return {
            get: () => null,
            set: () => {},
        };
    }
    return {
        get: () => {
        const value = localStorage.getItem(key);
        if (value) {
            try {
            return JSON.parse(value) as T;
            } catch {
            console.error(`Failed to parse localStorage item for key: ${key}`);
            return null;
            }
        }
        return null;
        },
        set: (value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
        },
    };
}

function useTableStorage<T>() {
    return useLocalStorage<T>('tableData');
}

export { useTableStorage };