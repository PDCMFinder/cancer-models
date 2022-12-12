import { breakPoints } from "../../utils/breakpoints";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import NavDesktop from "./Navbar--desktop/Navbar--desktop";
import NavMobile from "./Navbar--mobile/Navbar--mobile";
import ShowHide from "../ShowHide/ShowHide";
import { routes } from "../../utils/routes";

// controls responsive change of component
const Navbar = () => {
	const { windowWidth } = useWindowDimensions();

	const bpMedium = breakPoints.medium;

	return (
		<header>
			<ShowHide showOver={bpMedium} windowWidth={windowWidth}>
				<NavDesktop routes={routes} />
			</ShowHide>
			<ShowHide hideOver={bpMedium} windowWidth={windowWidth}>
				<NavMobile routes={routes} />
			</ShowHide>
		</header>
	);
};

export default Navbar;
