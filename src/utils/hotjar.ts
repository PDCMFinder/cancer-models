export const HJ_ID = "3209855";

export const hj_event = (event: string) => {
	if (
		typeof (window as any).hj !== "undefined" &&
		typeof (window as any).hj === "function"
	) {
		(window as any).hj(event);
	}
};
