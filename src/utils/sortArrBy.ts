export const sortObjectArrayBy = (
	array: any[],
	sortOrder: string[],
	sortProperty?: string,
	returnNewArray?: boolean,
	reverseOriginalArray?: boolean
): any[] => {
	const sortedArray = [...array];
	const sortMap = Object.fromEntries(
		sortOrder.map((value, index) => [value.toLowerCase(), index])
	);

	if (sortProperty) {
		sortedArray.sort((a, b) => {
			const aValue = (a[sortProperty] || "").toLowerCase();
			const bValue = (b[sortProperty] || "").toLowerCase();
			return sortMap[bValue] - sortMap[aValue];
		});
	} else {
		sortedArray.sort(
			(a, b) => sortMap[b.toLowerCase()] - sortMap[a.toLowerCase()]
		);
	}

	if (returnNewArray) sortedArray;
	if (reverseOriginalArray) array.reverse();
	return array;
};
