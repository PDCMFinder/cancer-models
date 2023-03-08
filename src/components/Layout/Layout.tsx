import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CookieConsent from "../CookieConsent/CookieConsent";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const [cookies] = useCookies(["CookieConsent"]);
	const [cookieConsentHeight, setCookieConsentHeight] = useState<number>(0);

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
			<Footer cookieConsentHeight={cookieConsentHeight} />
		</>
	);
};

export default Layout;
