import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { NavProps } from "../../../../types/globalTypes";
import handleBodyClass from "../../../utils/handleBodyClass";
import { Route, routesWithGAEvents } from "../../../utils/routes";
import ActiveLink from "../../ActiveLink/ActiveLink";
import CloseIcon from "../../Icons/CloseIcon/CloseIcon";
import Logotype from "../../Logotype/Logotype";
import styles from "./Navbar-mobile.module.scss";

export enum AddRemove {
	add = "add",
	remove = "remove"
}

const NavMobile = (props: NavProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	// Close menu when changing page
	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
			handleBodyClass(["overflow-hidden"], AddRemove.remove);
		}
	}, [router.asPath]);

	const handleToggleMenu = () => {
		// Add or remove body class to stylize
		let addRemoveBodyClass: AddRemove = !isMenuOpen
			? AddRemove.add
			: AddRemove.remove;
		handleBodyClass(["overflow-hidden"], addRemoveBodyClass);
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<nav className={styles["Navbar-mobile"]} data-test="navbar-mobile">
			{!isMenuOpen && (
				<div
					className={`container text-white ${styles["Navbar-mobile_topBar"]}`}
				>
					<div className="row align-center">
						<div className="col-8">
							<Link href="/" aria-label="CancerModels.Org logo">
								<Logotype color="white" />
							</Link>
						</div>
						<div
							className={`col-4 text-right ${styles["Navbar-mobile_toggleMenuContainer"]}`}
						>
							{!isMenuOpen ? (
								<button onClick={handleToggleMenu}>Menu</button>
							) : (
								<CloseIcon onClick={handleToggleMenu} />
							)}
						</div>
					</div>
				</div>
			)}
			{/* Container with menu items */}
			{isMenuOpen && (
				<div
					className={`text-white ${styles["Navbar-mobile_menu"]}`}
					data-test="navbar-mobile-menu"
				>
					<div className="container d-flex flex-column justify-content-between h-100 text-center">
						<CloseIcon
							onClick={handleToggleMenu}
							className="position-absolute right-margin"
						/>
						<div className="row">
							<div className="col">
								<ul className="ul-noStyle mt-0">
									{props.routes.map((route: Route) => {
										let children = route.children;

										if (children) {
											return children.map((child) => {
												let path = child.path,
													onClickProp;

												const childGAEvent = routesWithGAEvents.find(
													(route) => route.routeName === child.name
												);

												if (childGAEvent) {
													onClickProp = () =>
														ReactGA.event(childGAEvent.eventName, {
															category: "event"
														});
												}

												return (
													<li key={path}>
														<ActiveLink
															className={`${styles.Navbar_item} link-text-light`}
															activeClassName={styles["Navbar_item-active"]}
															href={path}
															onClick={onClickProp}
														>
															{child.name}
														</ActiveLink>
													</li>
												);
											});
										} else if (route.path) {
											let path = route.path;

											return (
												<li key={path}>
													<ActiveLink
														className={`${styles.Navbar_item} link-text-light`}
														activeClassName={styles["Navbar_item-active"]}
														href={path}
													>
														{route.name}
													</ActiveLink>
												</li>
											);
										}
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavMobile;
