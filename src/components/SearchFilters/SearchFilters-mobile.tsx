import Accordion from "../Accordion/Accordion";
import InputAndLabel from "../Input/InputAndLabel";

const filterData = [
	{
		facet_section: "model",
		facet_filters: [
			{
				facet_name: "Dataset available",
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

const SearchFiltersMobile = () => {
	return (
		<>
			{filterData.map((section) => (
				<Accordion
					buttonClassName="text-bold"
					key={section.facet_section}
					id={section.facet_section}
					open={true}
					content={section.facet_filters.map((filter) => {
						let filterContent = null;

						if (filter.hasOwnProperty("facet_example")) {
							// create search input with options
							filterContent = (
								<InputAndLabel
									name={filter.facet_name}
									type="search"
									label={filter.facet_name}
									placeholder={filter.facet_example}
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
								key={filter.facet_name}
								id={filter.facet_name}
								contentClassName="mb-2"
								content={filterContent}
							/>
						);
					})}
				/>
			))}
		</>
	);
};

export default SearchFiltersMobile;
