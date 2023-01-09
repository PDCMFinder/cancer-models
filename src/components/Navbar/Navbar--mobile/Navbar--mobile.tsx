import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CloseIcon from "../../CloseIcon/CloseIcon";
import Logotype from "../../Logotype/Logotype";
import handleBodyClass from "../../../utils/handleBodyClass";
import { INavProps, IRoute } from "../../../../globalTypes";
import ActiveLink from "../../ActiveLink/ActiveLink";
import Link from "next/link";
import styles from "./Navbar--mobile.module.scss";

const ADD = "add",
	REMOVE = "remove";

const NavMobile = (props: INavProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	// Close menu when changing page
	useEffect(() => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
			handleBodyClass(["overflow-hidden"], REMOVE);
		}
	}, [router.asPath]);

	const handleToggleMenu = () => {
		// Add or remove body class to stylize
		let addRemoveBodyClass: typeof ADD | typeof REMOVE = !isMenuOpen
			? ADD
			: REMOVE;
		handleBodyClass(["overflow-hidden"], addRemoveBodyClass);
		setIsMenuOpen((prev) => !prev);
	};

	return (
		<nav className={styles["Navbar--mobile"]}>
			<div
				className={`container text-white ${styles["Navbar--mobile_topBar"]}`}
			>
				<div className="row align-center">
					<div className="col-7">
						<Link href="/">
							<Logotype color="white" />
						</Link>
					</div>
					<div className="col-5 text-right">
						{!isMenuOpen ? (
							<button onClick={handleToggleMenu}>Menu</button>
						) : (
							<CloseIcon onClick={handleToggleMenu} />
						)}
					</div>
				</div>
			</div>
			{/* Container with menu items */}
			{isMenuOpen && (
				<div className={`text-white ${styles["Navbar--mobile_menu"]}`}>
					<div className="container d-flex flex-column justify-content-between h-100 text-center">
						<div className="row">
							<div className="col">
								<ul className="ul-noStyle">
									{props.routes.map((route: IRoute) => {
										let children = route.children;

										if (children) {
											return children.map((child) => {
												let path = child.path;

												return (
													<li key={path}>
														<ActiveLink
															className={`${styles.Navbar_item} link--text--light`}
															activeClassName={styles["Navbar_item--active"]}
															href={path}
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
														className={`${styles.Navbar_item} link--text--light`}
														activeClassName={styles["Navbar_item--active"]}
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
						<div className="row">
							<div className="col">
								{/* Placeholder, change for API information */}
								<p className="text-small">
									© 2017-2022
									<br />
									Data Release 3.1 | 2022-12-07
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default NavMobile;
