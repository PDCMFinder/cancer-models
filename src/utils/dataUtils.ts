type CamelCase<S extends string> =
	S extends `${infer P1}_${infer P2}${infer P3}`
		? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
		: Lowercase<S>;

type CamelCaseKeys<T> = {
	[K in keyof T as CamelCase<string & K>]: T[K] extends object
		? CamelCaseKeys<T[K]>
		: T[K];
};

export function camelCase<T extends Record<string, any>>(
	obj: T
): CamelCaseKeys<T> {
	if (Array.isArray(obj)) {
		return obj.map(camelCase) as any;
	} else if (obj && typeof obj === "object") {
		return Object.fromEntries(
			Object.entries(obj).map(([k, v]) => [
				k.replace(/_([a-z])/g, (_, p1) => p1.toUpperCase()).replace(/_/g, ""),
				v && typeof v === "object" ? camelCase(v) : v
			])
		) as CamelCaseKeys<T>;
	}

	return obj as CamelCaseKeys<T>;
}

export function capitalizeFirstLetter(text: string) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

export const countUniqueValues = <
	T extends Record<string, string>,
	K extends keyof T
>(
	data: T[],
	key: K
): Record<T[K], number> => {
	let result = {} as Record<T[K], number>;

	data.forEach((item) => {
		const value = item[key];
		result[value] = (result[value] || 0) + 1;
	});

	return result;
};
