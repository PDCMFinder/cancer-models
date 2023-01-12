import useWindowDimensions from "../../hooks/useWindowDimensions";
import Accordion from "../Accordion/Accordion";
import InputAndLabel from "../Input/InputAndLabel";
import breakPoints from "../../utils/breakpoints";

const filterData = [
	{
		facet_section: "model",
		facet_filters: [
			{
				facet_name: "Dataset available",
				facet_column: "dataset_available",
				facet_options: [
					"dosing studies",
					"mutation",
					"cytogenetics",
					"publication",
					"patient treatment",
					"copy number alteration",
					"expression",
				],
			},
			{
				facet_name: "Datasource",
				facet_column: "datasource",
				facet_options: [
					"Curie-OC",
					"CMP",
					"VHIO-BC",
					"Wistar-MDAnderson-Penn",
					"VHIO-CRC",
					"HCMI",
					"UOM-BC",
					"DFCI-CPDM",
					"TRACE",
					"IRCC-CRC",
					"IRCC-GC",
					"MDAnderson",
					"JAX",
					"NKI",
					"PDMR",
					"VHIO-PC",
					"HCI-BCM",
					"Curie-BC",
					"WUSTL",
					"LIH",
					"UMCG",
					"UOC-BC",
					"SJCRH",
					"CRL",
					"PIVOT",
					"Curie-LC",
					"PMLB",
				],
			},
		],
	},
	{
		facet_section: "molecular_data",
		facet_filters: [
			{
				facet_name: "Cytogenetics",
				facet_column: "crytogenetics",
				facet_options: [
					"ERBB2",
					"PGR",
					"KRT19",
					"ROS1",
					"MKI67",
					"IDH1",
					"KRT18",
					"PTPRC",
					"ESR1",
					"ALK",
				],
				facet_example: "ESR1",
			},
			{
				facet_name: "Breast cancer biomarkers",
				facet_column: "breast_cancer_biomarkers",
				facet_options: [
					"PR/PGR positive",
					"PR/PGR negative",
					"HER2/ERBB2 positive",
					"ER/ESR1 negative",
					"HER2/ERBB2 negative",
					"ER/ESR1 positive",
				],
			},
		],
	},
];

interface ISearchFilters {
	topFiltersOpen?: boolean;
	layout: "vertical" | "horizontal";
	// filterData: {
	// 	facet_section: string;
	// 	facet_filters: {
	// 		facet_name: string;
	// 		facet_column: string; // used to build query
	// 		facet_options: string[];
	// 		facet_example?: string;
	// 	}[];
	// }[];
}

const SearchFilters = (props: ISearchFilters) => {
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large;

	return (
		<>
			{filterData.map((section) => {
				let facetSection = section.facet_section;

				return (
					<Accordion
						buttonClassName="text-bold"
						key={facetSection}
						id={facetSection}
						open={true}
						contentClassName="d-lg-flex"
						content={section.facet_filters.map((filter) => {
							let filterContent = null,
								facetName = filter.facet_name,
								subFilterAmount = section.facet_filters.length;

							if (filter.hasOwnProperty("facet_example")) {
								// create search input
								filterContent = (
									<InputAndLabel
										name={facetName}
										type="search"
										label={facetName}
										placeholder={"filter.facet_example"}
										labelClassName="hideElement-accessible"
									/>
								);
							} else {
								// create checkbox per option
								filterContent = (
									<ul className="ul-noStyle m-0">
										{filter.facet_options.map((option) => (
											<li key={option}>
												<InputAndLabel
													name={option}
													type="checkbox"
													label={option}
												/>
											</li>
										))}
									</ul>
								);
							}

							return (
								<Accordion
									key={facetName}
									style={{
										width:
											props.layout === "horizontal"
												? `${100 / subFilterAmount}%`
												: null,
									}}
									id={facetName}
									contentClassName="mb-2"
									open={(windowWidth || 0) >= bpLarge ? true : false}
									content={filterContent}
								/>
							);
						})}
					/>
				);
			})}
		</>
	);
};

export default SearchFilters;
