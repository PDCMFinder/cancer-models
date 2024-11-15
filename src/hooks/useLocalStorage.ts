import { useState } from "react";

function useLocalStorage<T>(
	key: string,
	fallbackValue: T
): [T, (value: T) => void] {
	const isClient = typeof window !== "undefined";
	const storedValue = isClient ? localStorage.getItem(key) : null;
	const parsedValue = storedValue ? JSON.parse(storedValue) : fallbackValue;

	const [value, setValue] = useState<T>(parsedValue);

	const setLocalStorageValue = (newValue: T) => {
		if (isClient) {
			setValue(newValue);
			localStorage.setItem(key, JSON.stringify(newValue));
		}
	};

	return [value, setLocalStorageValue];
}

export default useLocalStorage;
