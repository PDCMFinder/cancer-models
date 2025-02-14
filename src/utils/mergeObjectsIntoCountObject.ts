const mergeObjectsIntoCountObject = <T extends string>(
	obj: Record<T, number>[]
) => {
	return obj.reduce(
		(acc: Record<string, number>, curr: Record<string, number>) => {
			const key = Object.keys(curr)[0] as T; // Extract the first key so we can use it as the key in the result object
			acc[curr[key]] = curr.count;

			return acc;
		},
		{}
	);
};

export default mergeObjectsIntoCountObject;
