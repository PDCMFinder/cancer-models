import Logotype from "../Logotype/Logotype";
import { routes, routesWithGAEvents } from "../../utils/routes";
import { IRoute } from "../../../types/globalTypes";
import ActiveLink from "../ActiveLink/ActiveLink";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { useQuery } from "react-query";
import { getLatestDataReleaseInformation } from "../../apis/AggregatedData.api";
import ReactGA from "react-ga4";

interface IFooterProps {
	cookieConsentHeight: number;
}

const Footer = (props: IFooterProps) => {
	let latestDataReleaseInfo = useQuery("latestDataReleaseInfo", () => {
		return getLatestDataReleaseInformation();
	});

	return (
		<footer
			className={`${styles.Footer} text-white`}
			style={{ paddingBottom: `calc(${props.cookieConsentHeight}px + 3.5rem)` }}
		>
			<div className="container">
				<div className={`row ${styles["Footer_row-main"]}`}>
					<div className="col-12 col-lg-2">
						<Link
							href="/"
							className={styles.Footer_Logotype}
							aria-label="CancerModels.Org logo"
						>
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
														opensNewTab={route.opensNewTab}
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

										if (route.name === "More" && children) {
											return children.map((child) => {
												let childName = child.name,
													onClickProp;

												const childGAEvent = routesWithGAEvents.find(
													(route) => route.routeName === childName
												);

												if (childGAEvent) {
													onClickProp = () =>
														ReactGA.event(childGAEvent.eventName, {
															category: "event",
														});
												}

												return (
													<li key={child.path}>
														<ActiveLink
															className="link-text-light"
															activeClassName={styles["Footer_item-active"]}
															href={child.path}
															opensNewTab={child.opensNewTab}
															onClick={onClickProp}
														>
															{child.name}
														</ActiveLink>
													</li>
												);
											});
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
							CA204781, U24 CA253539 and R01 CA089713.
						</p>
						<p className="mb-0">
							<a
								href="mailto:info@cancermodels.org"
								className="link-text-light mt-2"
							>
								info@cancermodels.org
							</a>
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p className="text-small text-center">
							© 2017-
							{new Date(
								latestDataReleaseInfo.data?.released_at || Date.now()
							).getFullYear()}
							<br />
							{`Data Release ${
								latestDataReleaseInfo.data?.tag_name
							} | ${new Date(
								latestDataReleaseInfo.data?.released_at || Date.now()
							).getFullYear()}`}
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
							<br />
							Our platform also conforms to the EMBL-EBI{" "}
							<a
								target="_blank"
								rel="noreferrer noopener"
								className="link-text-light"
								href="https://www.ebi.ac.uk/long-term-data-preservation"
							>
								long-term data preservation policies.
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
