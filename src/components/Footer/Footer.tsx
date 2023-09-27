import Logotype from "../Logotype/Logotype";
import { routes } from "../../utils/routes";
import { IRoute } from "../../../globalTypes";
import ActiveLink from "../ActiveLink/ActiveLink";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { useQuery } from "react-query";
import { getDataReleaseInformation } from "../../apis/AggregatedData.api";
import { hj_event } from "../../utils/hotjar";

interface IFooterProps {
	cookieConsentHeight: number;
}

const Footer = (props: IFooterProps) => {
	let releaseInfo = useQuery("releaseInfo", () => {
		return getDataReleaseInformation();
	});

	return (
		<footer
			className={`${styles.Footer} text-white`}
			style={{ paddingBottom: `calc(${props.cookieConsentHeight}px + 3.5rem)` }}
		>
			<div className="container">
				<div className={`row ${styles["Footer_row-main"]}`}>
					<div className="col-12 col-lg-2">
						<Link href="/" className={styles.Footer_Logotype}>
							<Logotype color="white" />
						</Link>
					</div>
					<div className="col-12 col-md-4 col-xl-3">
						<div className="row">
							<div className="col-12 col-lg-6">
								<ul className={`ul-noStyle ${styles.Footer_nav_firstRow}`}>
									{routes.map((route: IRoute) => {
										let path = route.path;
										if (route.children) {
											return;
										} else if (path) {
											return (
												<li key={path}>
													<ActiveLink
														className="link-text-light"
														activeClassName={styles["Footer_item-active"]}
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
								<ul className="ul-noStyle m-0">
									{routes.map((route) => {
										let children = route.children;

										if (route.name === "About" && children) {
											return children.map((child) => (
												<li key={child.path}>
													<ActiveLink
														className="link-text-light"
														activeClassName={styles["Footer_item-active"]}
														href={child.path}
													>
														{child.name}
													</ActiveLink>
												</li>
											));
										}
									})}
									<li>
										<ActiveLink
											className="link-text-light"
											activeClassName={styles["Footer_item-active"]}
											href="/terms-of-use"
										>
											Terms of Use
										</ActiveLink>
									</li>
									<li>
										<ActiveLink
											className="link-text-light"
											activeClassName={styles["Footer_item-active"]}
											href="/privacy-policy"
										>
											Privacy Policy
										</ActiveLink>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-7 col-lg-5 col-xl-4 offset-lg-1 offset-xl-3 d-flex flex-column justify-content-between">
						<p>
							<Link
								className="link-text-light"
								href="https://www.ebi.ac.uk/"
								target="_blank"
							>
								EMBL-EBI
							</Link>{" "}
							and{" "}
							<Link
								className="link-text-light"
								href="https://www.jax.org/"
								target="_blank"
								rel="noopener noreferrer"
							>
								The Jackson Laboratory
							</Link>{" "}
							are co-developers of CancerModels.Org. This work is supported by
							the National Institutes of Health/National Cancer Institute U24
							CA204781 01, U24 CA253539 01 and R01 CA089713.
						</p>
						<p className="mb-0">
							<a
								href="mailto:info@cancermodels.org"
								className="link-text-light mt-2"
								onClick={() => hj_event("click_footerEmail")}
							>
								info@cancermodels.org
							</a>
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						{/* Placeholder, change for API information */}
						<p className="text-small text-center">
							© 2017-{new Date(releaseInfo.data?.date).getFullYear() || 2023}
							<br />
							{releaseInfo.data
								? `Data Release ${releaseInfo.data.name
										.replace("dr.", "")
										.replace("dr", "")} | 
								${new Date(releaseInfo.data.date).toISOString().substring(0, 10)}`
								: null}
							<br />
							<Link href="/about/releases" className="link-text-light">
								Release log
							</Link>
						</p>
						<p className="text-center">
							All model and data submissions are made available under{" "}
							<Link
								target="_blank"
								rel="noreferrer noopener"
								href="https://creativecommons.org/share-your-work/public-domain/cc0/"
								className="link-text-light"
							>
								CC0
							</Link>{" "}
							or{" "}
							<Link
								target="_blank"
								rel="noreferrer noopener"
								href="https://www.ebi.ac.uk/about/terms-of-use"
								className="link-text-light"
							>
								EMBL-EBI terms of use.
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
