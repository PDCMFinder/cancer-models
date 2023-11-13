export function camelCase(obj: any) {
	const newObj: any = {};
	for (const d in obj) {
		if (obj.hasOwnProperty(d)) {
			newObj[
				d.replace(/(_\w)/g, function (k) {
					return k[1].toUpperCase();
				})
			] = obj[d];
		}
	}
	return newObj;
}

export function capitalizeFirstLetter(text: string) {
	return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}
