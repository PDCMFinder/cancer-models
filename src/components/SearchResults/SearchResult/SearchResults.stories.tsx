import { ComponentMeta, ComponentStory } from "@storybook/react";
import SearchResult from "./SearchResult";

export default {
	title: "UI/SearchResults/SearchResult",
	component: SearchResult
} as ComponentMeta<typeof SearchResult>;

const Template: ComponentStory<typeof SearchResult> = (args) => (
	<SearchResult {...args} />
);

export const Component = Template.bind({});
Component.args = {
	data: {
		pdcmId: "SIDM00861",
		sourceId: "CMP",
		datasource: "",
		providerName: "Cell Model Passports",
		histology: "Ovarian Clear Cell Adenocarcinoma",
		primarySite: "ovary",
		collectionSite: "ovary",
		tumourType: "Not Provided",
		dataAvailable: ["mutation", "copy number alteration", "expression"],
		modelType: "cell line",
		patientAge: "40 - 49",
		patientSex: "female",
		score: 0,
		modelAvailable: true
	},
	addModelToCompare: (e) => alert(e.target.id),
	compareCheck: false
};
