import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Accordion from "../Accordion/Accordion";
import AccordionItem from "../Accordion/AccordionItem";
import Button from "../Button/Button";
import Card from "../Card/Card";
import FeedbackIcon from "../FeedbackIcon/FeedbackIcon";
import FloatingButton from "../FloatingWidget/FloatingButton";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";
import InputAndLabel from "../Input/InputAndLabel";
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

// type CookieConditions = "accepted" | "rejected" | "pending";
enum CookieConditions {
	accepted = "accepted",
	rejected = "rejected",
	pending = "pending"
}

type LayoutProps = { children: JSX.Element };

const Layout = (props: LayoutProps) => {
	const [cookies, setCookie] = useCookies();
	const [showFeedbackModal, setShowFeedbackModal] = useState(false);
	const [choosingCookies, setChoosingCookies] = useState(false);
	const gaRef = useRef<HTMLInputElement | null>(null);
	const hjRef = useRef<HTMLInputElement | null>(null);
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

	const isPendingOrMissing = (cookieKey: string) =>
		!cookies["cm_consent"]?.[cookieKey] ||
		cookies["cm_consent"]?.[cookieKey] === CookieConditions.pending;

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main>{props.children}</main>
				{(isPendingOrMissing("ga") || isPendingOrMissing("hj")) && (
					<DynamicModal
						verticalAlign="top"
						strictClose={true}
						style={{ maxWidth: "600px", overflow: "scroll" }}
						modalWidth="100"
					>
						<Card
							className="bg-white"
							contentClassName="pt-3"
							headerClassName="pt-1 pb-0 px-1 bg-white"
							header={
								<header className="text-right">
									<CloseIcon
										color="dark"
										onClick={() =>
											setCookie(
												"cm_consent",
												{
													ga: CookieConditions.rejected,
													hj: CookieConditions.rejected
												},
												{
													sameSite: "lax",
													maxAge: 25920
												}
											)
										}
									/>
								</header>
							}
						>
							{!choosingCookies ? (
								<>
									<p className="text-center">
										CancerModels.Org uses cookies to enhance your browsing
										experience. For more information or to select your
										preferences, please click Choose Cookies.
									</p>
									<div className="d-flex flex-column flex-md-row align-center justify-content-around">
										<Button
											priority="primary"
											color="dark"
											className="mb-0"
											onClick={() =>
												setCookie(
													"cm_consent",
													{
														ga: CookieConditions.accepted,
														hj: CookieConditions.accepted
													},
													{
														sameSite: "lax",
														maxAge: 259200
													}
												)
											}
										>
											Accept Cookies
										</Button>
										<Button
											priority="secondary"
											color="dark"
											className="mb-0"
											onClick={() => setChoosingCookies(true)}
										>
											Choose Cookies
										</Button>
									</div>
								</>
							) : (
								<>
									<p>
										<b>Manage Consent Preferences</b>
									</p>
									<Accordion className="bg-lightGray br-common p-2">
										<AccordionItem title="Strictly Necessary Cookies">
											<p>
												These cookies are necessary for the website to function
												and cannot be switched off in our systems. They are
												usually only set in response to actions made by you
												which amount to a request for services, such as setting
												your cookie preferences. You can set your browser to
												block or alert you about these cookies, but the site
												might not function as expected. These cookies do not
												store any personally identifiable information.
											</p>
										</AccordionItem>
										<AccordionItem title="Performance Cookies">
											<p>
												These cookies are necessary for the website to function
												and cannot be switched off in our systems. They are
												usually only set in response to actions made by you
												which amount to a request for services, such as setting
												your cookie preferences. You can set your browser to
												block or alert you about these cookies, but the site
												might not function as expected. These cookies do not
												store any personally identifiable information.
											</p>
											<InputAndLabel
												name="googleAnalytics"
												type="checkbox"
												label="Accept Google Analytics"
												forId="googleAnalytics"
												inputRef={gaRef}
											/>
											<InputAndLabel
												name="hotjarAnalytics"
												type="checkbox"
												label="Accept Hotjar Analytics"
												forId="hotjarAnalytics"
												inputRef={hjRef}
											/>
										</AccordionItem>
									</Accordion>
									<div className="d-flex flex-column flex-md-row align-center justify-content-around">
										<Button
											priority="primary"
											color="dark"
											className="mb-0"
											onClick={() => {
												setChoosingCookies(false);
												console.log(hjRef.current?.checked);
												console.log("first");
												setCookie(
													"cm_consent",
													{
														ga: CookieConditions.accepted,
														hj: CookieConditions.accepted
													},
													{
														sameSite: "lax",
														maxAge: 259200
													}
												);
											}}
										>
											Accept All
										</Button>
										<Button
											priority="primary"
											color="dark"
											className="mb-0"
											onClick={() => {
												setChoosingCookies(false);
												console.log(hjRef.current?.checked);
												console.log("first");
												setCookie(
													"cm_consent",
													{
														ga: gaRef.current?.checked
															? CookieConditions.accepted
															: CookieConditions.rejected,
														hj: hjRef.current?.checked
															? CookieConditions.accepted
															: CookieConditions.rejected
													},
													{
														sameSite: "lax",
														maxAge: 259200
													}
												);
											}}
										>
											Accept Selected
										</Button>
									</div>
									<div className="text-center">
										<Button
											priority="secondary"
											color="dark"
											className="mb-0"
											onClick={() => {
												setChoosingCookies(false);
												setCookie(
													"cm_consent",
													{
														ga: CookieConditions.rejected,
														hj: CookieConditions.rejected
													},
													{
														sameSite: "lax",
														maxAge: 25920
													}
												);
											}}
										>
											Reject All
										</Button>
									</div>
								</>
							)}
						</Card>
					</DynamicModal>
				)}
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
