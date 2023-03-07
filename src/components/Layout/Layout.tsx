import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CookieConsent from "../CookieConsent/CookieConsent";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const [cookies] = useCookies(["cookieConsent"]);

	return (
		<>
			<Navbar />
			<main>{props.children}</main>
			{!cookies["cookieConsent"] && <CookieConsent />}
			<Footer />
		</>
	);
};

export default Layout;
