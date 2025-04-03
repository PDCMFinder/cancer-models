import dynamic from "next/dynamic";
import { useQuery } from "react-query";
import { getModelCount } from "../../apis/AggregatedData.api";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import breakPoints from "../../utils/breakpoints";
import { routes } from "../../utils/routes";
import Logotype from "../Logotype/Logotype";
import ShowHide from "../ShowHide/ShowHide";
import NavDesktop from "./Navbar-desktop/Navbar-desktop";
import NavMobile from "./Navbar-mobile/Navbar-mobile";

const DynamicModal = dynamic(() => import("../Modal/Modal"), {
	ssr: false
});
const DynamicCard = dynamic(() => import("../Card/Card"), {
	ssr: false
});

// controls responsive change of component
const Navbar = () => {
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;

	// we're using /info as our way to see if the API is working
	// /info is really light weight aka fast
	const { data: modelCountData, isLoading: isLoadingModelCount } = useQuery(
		"modelCount",
		() => getModelCount(),
		{
			retry: false // we're trying to know as soon as possible
		}
	);

	return (
		<>
			<header>
				<ShowHide showOver={bpLarge} windowWidth={windowWidth || 0}>
					<NavDesktop routes={routes} />
				</ShowHide>
				<ShowHide hideOver={bpLarge} windowWidth={windowWidth || 0}>
					<NavMobile routes={routes} />
				</ShowHide>
			</header>
			{!modelCountData && !isLoadingModelCount && (
				<DynamicModal strictClose backdropOpacity={0.9} className="w-md-unset">
					<DynamicCard className="bg-white text-center px-md-5">
						<div style={{ width: "250px" }} className="mx-auto mb-4">
							<Logotype color="dark" />
						</div>
						<h1 className="h2 mt-0">
							We are experiencing issues with our data
						</h1>
						<p>
							CancerModels.Org should be back soon, we are working hard to fix
							it. Please check back in a few minutes.
						</p>
						<p>
							If you need to contact us, please email{" "}
							<a href="mailto:info@cancermodels.org">info@cancermodels.org</a>{" "}
							and we&apos;ll get back to you as soon as possible.
						</p>
					</DynamicCard>
				</DynamicModal>
			)}
		</>
	);
};

export default Navbar;
