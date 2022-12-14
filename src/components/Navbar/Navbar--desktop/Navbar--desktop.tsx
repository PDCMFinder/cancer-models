import Logotype from "../../Logotype/Logotype";
import { INavProps, IRoute } from "../../../../globalTypes";
import Link from "next/link";
import ActiveLink from "../../ActiveLink/ActiveLink";

import styles from "./Navbar--desktop.module.scss";
import Button from "../../Button/Button";

const NavDesktop = (props: INavProps) => {
	// Need to get first secondary item so we can separate them from primary
	const firstSecondary = props.routes.find((el) => el.secondary);

	return (
		<nav className={styles["Navbar--desktop"]}>
			<div className="container">
				<div className="row align-center">
					<div className="col-3">
						<Link
							href="/"
							className={`${styles["Navbar--desktop_logotype--link"]}`}
						>
							<Logotype color="dark" />
						</Link>
					</div>
					<div className="col-9 col-xl-8 col-offset-xl-1">
						<ul
							className={`ul--noStyle align-center justify-content-between m-0 ${styles["Navbar--desktop_item--primary"]}`}
						>
							{props.routes.map((route: IRoute) => {
								let link = (
										<ActiveLink
											className={`${styles.Navbar_item} link--text--light`}
											activeClassName={styles["Navbar_item_link--active"]}
											href={route.path}
										>
											{route.name}
										</ActiveLink>
									),
									isFirstSecondary = firstSecondary === route;

								if (route.childTo) {
									return;
								} else if (route.parent) {
									return (
										<li
											key={route.path}
											className={
												isFirstSecondary
													? `${styles["Navbar_item--firstSecondary"]}`
													: undefined
											}
										>
											<Button
												color="dark"
												priority="primary"
												className="m-0"
												arrow
											>
												{link}
											</Button>
										</li>
									);
								} else {
									return (
										<li
											key={route.path}
											className={
												isFirstSecondary
													? `${styles["Navbar_item--firstSecondary"]}`
													: undefined
											}
										>
											{link}
										</li>
									);
								}
							})}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavDesktop;
