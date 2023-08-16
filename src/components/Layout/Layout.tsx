import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CookieConsent from "../CookieConsent/CookieConsent";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import FloatingWidget from "../FloatingWidget/FloatingWidget";
import Modal from "../Modal/Modal";
import Card from "../Card/Card";
import Button from "../Button/Button";
import CloseIcon from "../CloseIcon/CloseIcon";

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const [cookies, setCookie] = useCookies();
	const [cookieConsentHeight, setCookieConsentHeight] = useState<number>(0);
	const surveyHref =
		"https://docs.google.com/forms/d/e/1FAIpQLSeRJQ7Xu1pMqegYvs4KVdA17bucM6XzW2zzA2yHaroPfSR7Sg/viewform";

	useEffect(() => {
		if (cookies["CookieConsent"]) setCookieConsentHeight(0);
	}, [cookies["CookieConsent"]]);

	return (
		<>
			<Navbar />
			<main>{props.children}</main>
			{!cookies["CookieConsent"] && (
				<CookieConsent setCookieConsentHeight={setCookieConsentHeight} />
			)}
			<FloatingWidget
				link={surveyHref}
				onClick={() =>
					setCookie("CookieFeedback", "true", {
						sameSite: "lax",
						maxAge: 2592000,
						path: "/",
					})
				}
			>
				Help us improve - take our user survey
			</FloatingWidget>
			<Footer cookieConsentHeight={cookieConsentHeight} />
			{!cookies["CookieFeedback"] && (
				<Modal
					style={{ maxWidth: "500px" }}
					modalWidth="100"
					handleClose={() =>
						setCookie("CookieFeedback", "true", {
							sameSite: "lax",
							maxAge: 259200,
							path: "/",
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
										setCookie("CookieFeedback", "true", {
											sameSite: "lax",
											maxAge: 259200,
											path: "/",
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
									setCookie("CookieFeedback", "true", {
										sameSite: "lax",
										maxAge: 2592000,
										path: "/",
									})
								}
							>
								Go to feedback survey
							</Button>
						</div>
					</Card>
				</Modal>
			)}
		</>
	);
};

export default Layout;
