export const sortObjArrBy = (
	currArr: any[],
	sortArr: string[],
	sortBy: string | undefined,
	newArr?: boolean,
	sendItemsToEnd?: boolean
) => {
	sortArr.reverse();
	if (sendItemsToEnd) currArr.reverse();

	if (sortBy && currArr[0].hasOwnProperty(sortBy)) {
		if (newArr) {
			return currArr
				.slice()
				.sort(
					(a, b) =>
						sortArr.indexOf(b[sortBy].toLowerCase()) -
						sortArr.indexOf(a[sortBy].toLowerCase())
				);
		} else {
			currArr.sort(
				(a, b) =>
					sortArr.indexOf(b[sortBy].toLowerCase()) -
					sortArr.indexOf(a[sortBy].toLowerCase())
			);
		}
	} else {
		currArr.sort(
			(a, b) =>
				sortArr.indexOf(a.toLowerCase()) - sortArr.indexOf(b.toLowerCase())
		);
	}
};
