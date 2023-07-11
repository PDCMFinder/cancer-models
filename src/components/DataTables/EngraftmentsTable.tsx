import Tooltip from "../Tooltip/Tooltip";
import styles from "./EngraftmentsTable.module.scss";

interface IEngraftmentsTableProps {
	data: any;
	limited?: boolean;
}

const EngraftmentsTable = (props: IEngraftmentsTableProps) => {
	const NA_STRING = "NA",
		isLimited = props.limited;

	return (
		<div id="engraftments" className="row mb-5 pt-1">
			<div className="col-12 mb-1">
				<div className="overflow-scroll showScrollbar-vertical">
					<table>
						<caption>PDX model engraftment</caption>
						<thead>
							<tr>
								<th>HOST STRAIN NAME</th>
								<th>SITE</th>
								{!isLimited && <th>TYPE</th>}
								{!isLimited && <th>MATERIAL</th>}
								{!isLimited && <th>MATERIAL STATUS</th>}
								{!isLimited && <th>PASSAGE</th>}
							</tr>
						</thead>
						<tbody>
							{props.data?.map((engraftment) => {
								const hostStrainNomenclatures =
									engraftment.hostStrainNomenclature.split(" ").map((h) => {
										const regExp = /(.*)<sup>(.*)<\/sup>(.*)/gm;
										const matches = regExp.exec(h) || [];
										const strainPrefix = matches[1] || "";
										const strainSup = matches[2] || "";
										const strainSuffix = matches[3] || "";

										return {
											strainPrefix,
											strainSup,
											strainSuffix,
										};
									});

								return (
									<tr key={engraftment.hostStrainNomenclature}>
										<td className="white-space-nowrap">
											<Tooltip
												content={hostStrainNomenclatures.map(
													({
														strainPrefix,
														strainSup,
														strainSuffix,
													}: {
														strainPrefix: string;
														strainSup: string;
														strainSuffix: string;
													}) => (
														<span
															className="text-small"
															key={strainPrefix + strainSup + strainSuffix}
														>
															{strainPrefix}
															<sup>{strainSup}</sup>
															{strainSuffix}{" "}
														</span>
													)
												)}
											>
												<span className="text-uppercase">
													{engraftment.hostStrain}
												</span>
											</Tooltip>
										</td>
										<td>{engraftment.engraftmentSite ?? NA_STRING}</td>
										{!isLimited && (
											<td>{engraftment.engraftmentType ?? NA_STRING}</td>
										)}
										{!isLimited && (
											<td>{engraftment.engraftmentSampleType ?? NA_STRING}</td>
										)}
										{!isLimited && (
											<td>{engraftment.engraftmentSampleState ?? NA_STRING}</td>
										)}
										{!isLimited && (
											<td>{engraftment.passageNumber ?? NA_STRING}</td>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default EngraftmentsTable;
