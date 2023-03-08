import styles from "./CookieConsent.module.scss";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Button from "../Button/Button";

interface ICookieConsentProps {}

const CookieConsent = (props: ICookieConsentProps) => {
	const [cookie, setCookie] = useCookies(["CookieConsent"]);

	return (
		<div
			className={`${styles.CookieConsent} position-fixed bottom-0 w-100 d-md-flex align-center bg-white p-2`}
		>
			<p className="mb-0">
				This website requires cookies, and the limited processing of your
				personal data in order to function. By using the site you are agreeing
				to this as outlined in our{" "}
				<Link href="/privacy-policy">Privacy Notice</Link> and{" "}
				<Link href="/terms-of-use">Terms of Use</Link>.
			</p>
			<div className="ml-md-2 d-lg-flex">
				<Button
					className="mb-0 mt-md-0"
					priority="secondary"
					color="dark"
					onClick={() =>
						setCookie("CookieConsent", "false", {
							sameSite: "lax",
							maxAge: 900000,
						})
					}
				>
					Reject
				</Button>
				<Button
					className="ml-3 ml-md-0 ml-lg-2 mb-0 mt-lg-0"
					priority="primary"
					color="dark"
					onClick={() =>
						setCookie("CookieConsent", "true", {
							sameSite: "lax",
							maxAge: 900000,
						})
					}
				>
					Accept
				</Button>
			</div>
		</div>
	);
};

export default CookieConsent;
