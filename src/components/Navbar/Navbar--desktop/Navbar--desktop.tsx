import Logotype from "../../Logotype/Logotype";
import { INavProps, IRoute } from "../../../../globalTypes";
import Link from "next/link";
import ActiveLink from "../../ActiveLink/ActiveLink";

import styles from "./Navbar--desktop.module.scss";
import Button from "../../Button/Button";

const NavDesktop = (props: INavProps) => {
	// Need to get first secondary item so we can separate them from primary items
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
					<div className="col-9 col-xl-8 offset-xl-1">
						<ul
							className={`ul--noStyle align-center justify-content-between m-0 ${styles["Navbar--desktop_item--primary"]}`}
						>
							{props.routes.map((route: IRoute) => {
								let link,
									isFirstSecondary = firstSecondary === route,
									firstSecondaryClass = "Navbar_item--firstSecondary",
									children = route.children,
									path = route.path,
									name = route.name;

								if (path && path !== "#") {
									link = (
										<ActiveLink
											className={`${styles.Navbar_item} link--text--light`}
											activeClassName={styles["Navbar_item_link--active"]}
											href={path}
										>
											{name}
										</ActiveLink>
									);
								} else {
									link = name;
								}

								if (children) {
									let childrenItems = children.map((child) => {
										let childPath = child.path;

										return (
											<li key={childPath}>
												<ActiveLink
													className={`${styles.Navbar_item} link--text--light`}
													activeClassName={styles["Navbar_item--active"]}
													href={childPath}
												>
													{child.name}
												</ActiveLink>
											</li>
										);
									});

									return (
										<li
											key={path || name}
											className={`${
												isFirstSecondary
													? `${styles[firstSecondaryClass]}`
													: styles["Navbar_item--secondary"]
											} dropdownParent`}
										>
											<Button
												color="dark"
												priority="primary"
												className="m-0"
												arrow
											>
												{link}
											</Button>
											<ul className="ul--noStyle dropdownChildren dropdownChildren--flushRight">
												{childrenItems}
											</ul>
										</li>
									);
								} else {
									return (
										<li
											key={path}
											className={
												isFirstSecondary
													? `${styles[firstSecondaryClass]}`
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
