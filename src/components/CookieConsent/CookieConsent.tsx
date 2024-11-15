import Link from "next/link";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Button from "../Button/Button";
import styles from "./CookieConsent.module.scss";

const CookieConsent = () => {
	const [acceptedCookies, setAcceptedCookies] = useLocalStorage(
		"accepted_cookies",
		false
	);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (isClient && !acceptedCookies) {
		return (
			<div
				className={`${styles.CookieConsent} position-fixed bottom-0 w-100 d-md-flex align-center bg-white p-2 text-small`}
			>
				<p className="mb-0">
					This website requires cookies, and the limited processing of your
					personal data in order to function. By using the site you are agreeing
					to this as outlined in our{" "}
					<Link href="/privacy-policy">Privacy Notice</Link> and{" "}
					<Link href="/terms-of-use">Terms of Use</Link>.
				</p>
				<div className="ml-md-5 d-lg-flex">
					<Button
						className="text-left link-text mt-0 mr-3 mr-md-0 mb-md-1 mr-xxx-3 p-0 text-link"
						priority="secondary"
						color="dark"
						onClick={() => setAcceptedCookies(true)}
					>
						I agree, dismiss this banner
					</Button>
				</div>
			</div>
		);
	}

	// initially returning null so banner doesn't blink
	return null;
};

export default CookieConsent;
