import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CookieConsent from "../CookieConsent/CookieConsent";
import { useCookies } from "react-cookie";

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	const [cookies] = useCookies(["CookieConsent"]);

	return (
		<>
			<Navbar />
			<main>{props.children}</main>
			{!cookies["CookieConsent"] && <CookieConsent />}
			<Footer />
		</>
	);
};

export default Layout;
