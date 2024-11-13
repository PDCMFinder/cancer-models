import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Card from "../Card/Card";
import CookieConsentBanner from "../CookieConsentBanner/CookieConsentBanner";
import FloatingButton from "../FloatingWidget/FloatingButton";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";
import CookieIcon from "../Icons/CookieIcon";
import FeedbackIcon from "../Icons/FeedbackIcon";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
	loading: () => (
		<div style={{ height: "300px" }}>
			<Loader />
		</div>
	),
	ssr: false
});
const DynamicModal = dynamic(() => import("../Modal/Modal"), {
	ssr: false
});

type LayoutProps = { children: JSX.Element };

const Layout = (props: LayoutProps) => {
	const [cookies] = useCookies();
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const [cookieModalIsOpen, setCookieModalIsOpen] = useState(true);
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: Infinity,
						refetchOnWindowFocus: true
					}
				}
			})
	);

	useEffect(() => {
		setCookieModalIsOpen(
			!cookies["cm_consent"]?.["ga"] || !cookies["cm_consent"]?.["hj"]
		);
	}, [cookies["cm_consent"]]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{cookieModalIsOpen && <CookieConsentBanner />}
				<Navbar />
				<main>{props.children}</main>
				{/* bottom right survey bubble */}
				<FloatingButton
					onClick={() => {
						setShowFeedbackModal(true);
						ReactGA.event("feedback_bubble-click", {
							category: "event"
						});
					}}
					position="bottom right"
					className="p-2 br-round"
					priority="primary"
					color="dark"
				>
					<div className="d-flex align-center">
						<p className="mb-0 mr-2 text-small">
							We&apos;d love your (quick) feedback!
						</p>
						<FeedbackIcon />
					</div>
				</FloatingButton>
				<FloatingButton
					priority="secondary"
					color="dark"
					position="bottom right"
					className="p-1"
					fromRight={-5}
					fromBottom={4}
					onClick={() => setCookieModalIsOpen(true)}
				>
					<CookieIcon />
				</FloatingButton>
				<ReactQueryDevtools initialIsOpen={false} />
				<DynamicFooter />
				{showFeedbackModal && (
					<DynamicModal handleClose={() => setShowFeedbackModal(false)}>
						<Card
							className="bg-white"
							contentClassName="pt-0"
							headerClassName="py-1 px-2 bg-white"
							header={
								<header className="text-right">
									<CloseIcon
										color="dark"
										onClick={() => setShowFeedbackModal(false)}
									/>
								</header>
							}
						>
							<iframe
								src="https://docs.google.com/forms/d/e/1FAIpQLSdUyImdk48tbO72gw3BTuQ00grvJNgq25FnrlxxrF-1qPzrCA/viewform?embedded=true"
								width="640"
								height="550"
								frameBorder={0}
								marginHeight={0}
								marginWidth={0}
							>
								Loading…
							</iframe>
						</Card>
					</DynamicModal>
				)}
			</QueryClientProvider>
		</>
	);
};

export default Layout;
