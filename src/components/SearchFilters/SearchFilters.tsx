import breakPoints from "../../utils/breakpoints";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ShowHide from "../ShowHide/ShowHide";
import SearchFiltersDesktop from "./SearchFilters-desktop";
import SearchFiltersMobile from "./SearchFilters-mobile";
import { ISearchFiltersProps } from "../../../globalTypes";

// controls responsive change of component
const Navbar = (props: ISearchFiltersProps) => {
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;

	return (
		<header>
			<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
				<SearchFiltersDesktop filterData={props.filterData} />
			</ShowHide>
			<ShowHide hideOver={bpLarge} windowWidth={windowWidth || 0}>
				<SearchFiltersMobile filterData={props.filterData} />
			</ShowHide>
		</header>
	);
};

export default Navbar;
