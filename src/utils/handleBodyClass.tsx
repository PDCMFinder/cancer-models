import { AddRemove } from "../components/Navbar/Navbar-mobile/Navbar-mobile";

const addBodyClass = (className: string) =>
	document.body.classList.add(className);
const removeBodyClass = (className: string) =>
	document.body.classList.remove(className);

const handleBodyClass = (className: readonly string[], action: AddRemove) => {
	if (action === AddRemove.add) {
		className.map(addBodyClass);
	} else if (action === AddRemove.remove) {
		className.map(removeBodyClass);
	}
};

export default handleBodyClass;
