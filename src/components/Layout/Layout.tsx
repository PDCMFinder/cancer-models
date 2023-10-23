import Navbar from "../Navbar/Navbar";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import FloatingWidget from "../FloatingWidget/FloatingWidget";
import Card from "../Card/Card";
import Button from "../Button/Button";
import CloseIcon from "../CloseIcon/CloseIcon";
import dynamic from "next/dynamic";
import Loader from "../Loader/Loader";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const DynamicModal = dynamic(import("../Modal/Modal"), {
	loading: () => (
		<div style={{ height: "300px" }}>
			<Loader />
		</div>
	),
	ssr: false,
});
const DynamicCookieConsent = dynamic(import("../CookieConsent/CookieConsent"), {
	loading: () => (
		<div style={{ height: "100px" }}>
			<Loader />
		</div>
	),
	ssr: false,
});
const DynamicFooter = dynamic(() => import("../Footer/Footer"), {
	loading: () => (
		<div style={{ height: "300px" }}>
			<Loader />
		</div>
	),
	ssr: false,
});

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const [cookies, setCookie] = useCookies();
	const [cookieConsentHeight, setCookieConsentHeight] = useState<number>(0);
	const surveyHref =
		"https://docs.google.com/forms/d/e/1FAIpQLSeRJQ7Xu1pMqegYvs4KVdA17bucM6XzW2zzA2yHaroPfSR7Sg/viewform";
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: Infinity,
						refetchOnWindowFocus: true,
					},
				},
			})
	);

	useEffect(() => {
		if (cookies["cm_consent"]) setCookieConsentHeight(0);
	}, [cookies["cm_consent"]]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<main>{props.children}</main>
				{cookies["cm_consent"] ?? (
					<DynamicCookieConsent
						setCookieConsentHeight={setCookieConsentHeight}
					/>
				)}
				<FloatingWidget
					link={surveyHref}
					onClick={() =>
						setCookie("cm_feedback", "true", {
							sameSite: "lax",
							maxAge: 2592000,
						})
					}
				>
					Help us improve - take our user survey
				</FloatingWidget>
				<ReactQueryDevtools initialIsOpen={false} />
				<DynamicFooter cookieConsentHeight={cookieConsentHeight} />
				{!cookies["cm_feedback"] && (
					<DynamicModal
						style={{ maxWidth: "500px" }}
						modalWidth="100"
						handleClose={() =>
							setCookie("cm_feedback", "true", {
								sameSite: "lax",
								maxAge: 259200,
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
												maxAge: 259200,
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
											maxAge: 2592000,
										})
									}
								>
									Go to feedback survey
								</Button>
							</div>
						</Card>
					</DynamicModal>
				)}
			</QueryClientProvider>
		</>
	);
};

export default Layout;
