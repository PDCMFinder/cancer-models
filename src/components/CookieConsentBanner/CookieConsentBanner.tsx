import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import AccordionItem from "../Accordion/AccordionItem";
import Button from "../Button/Button";
import Card from "../Card/Card";
import CloseIcon from "../Icons/CloseIcon/CloseIcon";
import InputAndLabel from "../Input/InputAndLabel";
import Modal from "../Modal/Modal";

const DynamicAccordion = dynamic(() => import("../Accordion/Accordion"), {
	ssr: false
});

export enum CookieConditions {
	accepted = "accepted",
	rejected = "rejected"
}

const CookieConsentBanner = () => {
	const [cookies, setCookie] = useCookies();
	const [choosingCookies, setChoosingCookies] = useState(false);
	const gaRef = useRef<HTMLInputElement | null>(null);
	const hjRef = useRef<HTMLInputElement | null>(null);

	return (
		<Modal
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
							onClick={() => {
								// if cookies are already set and user closes modal, we want to keep them as they are
								if (
									!cookies["cm_consent"]?.["ga"] ||
									!cookies["cm_consent"]?.["hj"]
								) {
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
								}
							}}
						/>
					</header>
				}
			>
				{!choosingCookies ? (
					<>
						<p className="text-center">
							CancerModels.Org uses cookies to enhance your browsing experience.
							For more information or to select your preferences, please click
							Choose Cookies.
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
						<DynamicAccordion className="bg-lightGray br-common p-2">
							<AccordionItem title="Strictly Necessary Cookies">
								<p>
									These cookies are necessary for the website to function and
									cannot be switched off in our systems. They are usually only
									set in response to actions made by you which amount to a
									request for services, such as setting your cookie preferences.
									You can set your browser to block or alert you about these
									cookies, but the site might not function as expected. These
									cookies do not store any personally identifiable information.
								</p>
							</AccordionItem>
							<AccordionItem title="Performance Cookies">
								<p>
									These cookies are necessary for the website to function and
									cannot be switched off in our systems. They are usually only
									set in response to actions made by you which amount to a
									request for services, such as setting your cookie preferences.
									You can set your browser to block or alert you about these
									cookies, but the site might not function as expected. These
									cookies do not store any personally identifiable information.
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
								<Button
									priority="primary"
									color="dark"
									className="mb-0"
									onClick={() => {
										setChoosingCookies(false);
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
												maxAge:
													gaRef.current?.checked || hjRef.current?.checked
														? 259200
														: 25920
											}
										);
									}}
								>
									Accept Selected
								</Button>
							</AccordionItem>
						</DynamicAccordion>
						<div className="d-flex flex-column flex-md-row align-center justify-content-around">
							<Button
								priority="primary"
								color="dark"
								className="mb-0"
								onClick={() => {
									setChoosingCookies(false);
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
		</Modal>
	);
};

export default CookieConsentBanner;
