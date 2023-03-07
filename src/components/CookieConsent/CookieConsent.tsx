import styles from "./CookieConsent.module.scss";
import { useCookies } from "react-cookie";

interface ICookieConsentProps {}

const CookieConsent = (props: ICookieConsentProps) => {
	const [cookies, setCookie, removeCookie] = useCookies(["cookieConsent"]);

	return (
		<>
			<div
				onClick={() =>
					setCookie("cookieConsent", "true", {
						sameSite: "lax",
						maxAge: 900000,
					})
				}
			>
				cookie?
			</div>
			<div
				onClick={() =>
					setCookie("cookieConsent", "false", {
						sameSite: "lax",
						maxAge: 900000,
					})
				}
			>
				no cookie.
			</div>
		</>
	);
};

export default CookieConsent;
