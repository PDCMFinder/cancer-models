type EthnicityCounter = { patient_ethnicity: string; count: number };

type EthnicityCategories = { [key: string]: string[] };
export const ethnicityCategories: EthnicityCategories = {
	Asian: [
		"Eastasian",
		"East Asian",
		"South Asian",
		"Southasianorhispanic",
		"South Asian Or Hispanic",
		"Asian"
	],
	"Black Or African American": [
		"African",
		"African American",
		"Black",
		"Black Or African American",
		"Black Or African American; Not Hispanic Or Latino"
	],
	White: [
		"White; Not Hispanic Or Latino",
		"European",
		"Caucasian",
		"White",
		"Western European",
		"Italian"
	],
	"Hispanic Or Latino": [
		"Latino",
		"White; Hispanic Or Latino",
		"Hispanic",
		"Hispanic Or Latino"
	],
	"Not Provided": [
		"Not Specified",
		"Unknown",
		"Not Provided",
		"Not Collected",
		"Mixed_or_unknown",
		"Mixed Or Unknown",
		"Declined To Answer"
	],
	Other: [
		"Other",
		"Arabic",
		"Native Hawaiian Or Other Pacific Islander",
		"Not Hispanic Or Latino"
	]
};

export function countEthnicity(subethnicityCountList: EthnicityCounter[]) {
	const ethnictyCounts: { [key: string]: number } = {};

	subethnicityCountList.forEach((subethnicity) => {
		for (let key in ethnicityCategories) {
			if (ethnicityCategories[key].includes(subethnicity.patient_ethnicity)) {
				if (!ethnictyCounts[key]) ethnictyCounts[key] = 0;

				ethnictyCounts[key] += subethnicity.count;
			}
		}
	});

	return Object.keys(ethnictyCounts).map((e) => {
		return {
			patient_ethnicity: e,
			count: ethnictyCounts[e]
		};
	});
}

type AgeCategories = { [key: string]: string[] };

export const ageCategories: AgeCategories = {
	Paediatric: ["0 - 23 months", "2 - 9", "10 - 19"],
	Adult: [
		"20 - 29",
		"30 - 39",
		"40 - 49",
		"50 - 59",
		"60 - 69",
		"70 - 79",
		"80 - 89",
		"90 - 99"
	],
	"Not Provided": ["Not Provided", "Not Collected"]
};
