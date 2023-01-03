import Logotype from "../Logotype/Logotype";
import { routes } from "../../utils/routes";
import { IRoute } from "../../../globalTypes";
import ActiveLink from "../ActiveLink/ActiveLink";

import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className={`${styles.Footer} text-white`}>
			<div className="container">
				<div className={`row ${styles["Footer_row--main"]}`}>
					<div className="col-12 col-lg-2">
						<Link href="/" className={styles.Footer_Logotype}>
							<Logotype color="white" />
						</Link>
					</div>
					<div className="col-12 col-md-4 col-xl-3">
						<div className="row">
							<div className="col-12 col-lg-6">
								<ul className={`ul--noStyle ${styles.Footer_nav_firstRow}`}>
									{routes.map((route: IRoute) => {
										let path = route.path;
										if (route.children) {
											return;
										} else if (path) {
											return (
												<li key={path}>
													<ActiveLink
														className="link--text--light"
														activeClassName={styles["Footer_item--active"]}
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
							<div className="col-12 col-lg-6">
								<ul className="ul--noStyle m-0">
									{routes.map((route) => {
										let children = route.children;

										if (route.name === "About" && children) {
											return children.map((child) => (
												<li key={child.path}>
													<ActiveLink
														className="link--text--light"
														activeClassName={styles["Footer_item--active"]}
														href={child.path}
													>
														{child.name}
													</ActiveLink>
												</li>
											));
										}
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-7 col-lg-5 col-xl-4 offset-lg-1 offset-xl-3">
						{/* Replace with content from .md file? How to implement Link component? */}
						<p>
							<Link
								className="link--text--light"
								href="https://google.com"
								target="_blank"
							>
								EMBL-EBI
							</Link>{" "}
							and{" "}
							<Link
								className="link--text--light"
								href="https://www.jax.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								The Jackson Laboratory
							</Link>{" "}
							are co-developers of PDCM Finder. This work is supported by the
							National Institutes of Health/National Cancer Institute U24
							CA204781 01 (ended 31.08.2020), U24 CA253539 01 and R01 CA089713.
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						{/* Placeholder, change for API information */}
						<p className="text-small text-center m-0">
							© 2017-2022
							<br />
							Data Release 3.1 | 2022-12-07
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
