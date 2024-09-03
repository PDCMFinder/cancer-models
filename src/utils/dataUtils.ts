import { CamelCaseKeys } from "../../types/globalTypes";

export function camelCase<T extends Record<string, any>>(
	obj: T
): CamelCaseKeys<T> {
	const newObj: Partial<CamelCaseKeys<T>> = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const camelKey = key.replace(/(_\w)/g, (k) => k[1].toUpperCase());
			newObj[camelKey as keyof CamelCaseKeys<T>] = obj[key];
		}
	}
	return newObj as CamelCaseKeys<T>;
}

export function capitalizeFirstLetter(text: string) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}
