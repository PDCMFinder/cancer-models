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
			<FloatingWidget link={surveyHref}>
				Help us improve - take our user survey
			</FloatingWidget>
			<Footer cookieConsentHeight={cookieConsentHeight} />
			{!cookies["CookieFeedback"] && (
				<Modal
					verticalAlign="center"
					handleClose={() =>
						setCookie("CookieFeedback", "true", {
							sameSite: "lax",
						})
					}
				>
					<Card
						className="bg-white"
						style={{
							width: "clamp(420px, 40%, 50vw)",
						}}
						header={
							<header className="d-flex justify-content-between">
								<CloseIcon
									color="dark"
									onClick={() =>
										setCookie("CookieFeedback", "true", {
											sameSite: "lax",
										})
									}
								/>
							</header>
						}
					>
						<div className="text-center">
							<p>Help us improve - take our user survey</p>
							<Button
								htmlTag="a"
								href={surveyHref}
								color="dark"
								priority="primary"
								onClick={() =>
									setCookie("CookieFeedback", "true", {
										sameSite: "lax",
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
