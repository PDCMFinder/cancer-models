import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Card from "../Card/Card";
import CloseIcon from "../CloseIcon/CloseIcon";
import FeedbackIcon from "../FeedbackIcon/FeedbackIcon";
import FloatingButton from "../FloatingWidget/FloatingButton";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
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
const DynamicCookieConsent = dynamic(
	() => import("../CookieConsent/CookieConsent"),
	{
		ssr: false
	}
);

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const { asPath, isReady } = useRouter();
	const [cookies, setCookie] = useCookies();
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const [showBanner, setShowBanner] = useState(false);
	const surveyHref =
		"https://docs.google.com/forms/d/e/1FAIpQLSeRJQ7Xu1pMqegYvs4KVdA17bucM6XzW2zzA2yHaroPfSR7Sg/viewform";
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
		if (isReady) {
			const activePathname = new URL(asPath, location.href).pathname;

			if (activePathname === "/") {
				setShowBanner(true);
			} else {
				setShowBanner(false);
			}
		}
	}, [asPath, isReady]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				{showBanner && <Banner />}
				<Navbar />
				<main>{props.children}</main>
				{!cookies["cm_consent"] && <DynamicCookieConsent />}
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
					<FeedbackIcon />
				</FloatingButton>
				<ReactQueryDevtools initialIsOpen={false} />
				<DynamicFooter />
				{!cookies["cm_feedback"] && (
					<DynamicModal
						className="overflow-hidden"
						style={{ maxWidth: "500px" }}
						modalWidth="100"
						handleClose={() =>
							setCookie("cm_feedback", "true", {
								sameSite: "lax",
								maxAge: 259200
							})
						}
					>
						<Card
							className="bg-white"
							headerClassName="py-0 px-1 bg-white"
							header={
								<header className="text-right">
									<CloseIcon
										color="dark"
										onClick={() =>
											setCookie("cm_feedback", "true", {
												sameSite: "lax",
												maxAge: 259200
											})
										}
									/>
								</header>
							}
						>
							<div className="text-center">
								<h1 className="h2 mt-0">Help us improve</h1>
								<p>
									Please <b>help us improve</b> by filling our short user survey
								</p>
								<p>Thank you!</p>
								<Button
									htmlTag="a"
									href={surveyHref}
									color="dark"
									priority="primary"
									className="mb-5"
									onClick={() =>
										setCookie("cm_feedback", "true", {
											sameSite: "lax",
											maxAge: 2592000
										})
									}
								>
									Go to feedback survey
								</Button>
							</div>
						</Card>
					</DynamicModal>
				)}
				{showFeedbackModal && (
					<Modal handleClose={() => setShowFeedbackModal(false)}>
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
					</Modal>
				)}
			</QueryClientProvider>
		</>
	);
};

export default Layout;
