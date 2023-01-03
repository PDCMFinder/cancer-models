import { useEffect } from "react";

const addBodyClass = (className: string) =>
	document.body.classList.add(className);
const removeBodyClass = (className: string) =>
	document.body.classList.remove(className);

const useBodyClass = (className: string[], action: "add" | "remove") => {
	if (action === "add") {
		className ? className.map(addBodyClass) : addBodyClass(className);
	} else {
		className ? className.map(removeBodyClass) : removeBodyClass(className);
	}
};

export default useBodyClass;
