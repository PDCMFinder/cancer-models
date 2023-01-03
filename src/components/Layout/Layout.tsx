import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

interface ILayoutProps {
	children: JSX.Element;
}

const Layout = (props: ILayoutProps) => {
	return (
		<>
			<Navbar />
			<main>{props.children}</main>
			<Footer />
		</>
	);
};

export default Layout;
