const addBodyClass = (className: string) =>
	document.body.classList.add(className);
const removeBodyClass = (className: string) =>
	document.body.classList.remove(className);

const handleBodyClass = (className: string[], action: "add" | "remove") => {
	if (action === "add") {
		className.map(addBodyClass);
	} else {
		className.map(removeBodyClass);
	}
};

export default handleBodyClass;
