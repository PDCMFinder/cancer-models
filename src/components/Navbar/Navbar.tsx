import breakPoints from "../../utils/breakpoints";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import NavDesktop from "./Navbar--desktop/Navbar--desktop";
import NavMobile from "./Navbar--mobile/Navbar--mobile";
import ShowHide from "../ShowHide/ShowHide";
import { routes } from "../../utils/routes";

// controls responsive change of component
const Navbar = () => {
	const { windowWidth } = useWindowDimensions();

	const bpLarge = breakPoints.large;

	return (
		<header>
			<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
				<NavDesktop routes={routes} />
			</ShowHide>
			<ShowHide hideOver={bpLarge} windowWidth={windowWidth || 0}>
				<NavMobile routes={routes} />
			</ShowHide>
		</header>
	);
};

export default Navbar;
