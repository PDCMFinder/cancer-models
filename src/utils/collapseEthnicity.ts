type IEthnicityCounter = { patient_ethnicity: string; count: number };

type IEthnicityCategories = { [key: string]: string[] };

export const ethnicityCategories: IEthnicityCategories = {
	Asian: [
		"Eastasian",
		"East Asian",
		"South Asian",
		"Southasianorhispanic",
		"Asian"
	],
	"Black Or African American": [
		"African",
		"African American",
		"Black",
		"Black Or African American",
		"Black Or African American; Not Hispanic Or Latino"
	],
	White: ["White; Not Hispanic Or Latino", "European", "Caucasian", "White"],
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
		"Declined To Answer"
	],
	Other: [
		"Other",
		"Arabic",
		"Native Hawaiian Or Other Pacific Islander",
		"Not Hispanic Or Latino"
	]
};

export function countEthnicity(subethnicityCountList: IEthnicityCounter[]) {
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
