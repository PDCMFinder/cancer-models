import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchFilters from "./SearchFilters";
import { mockData } from "./StoryMockData";

export default {
	title: "UI/SearchFilters",
	component: SearchFilters,
} as ComponentMeta<typeof SearchFilters>;

const Template: ComponentStory<typeof SearchFilters> = (args) => (
	<div style={{ width: "400px" }}>
		<SearchFilters {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	data: mockData,
	selection: {
		external_model_id: {
			operator: "ANY",
			selection: [],
		},
		data_source: {
			operator: "ANY",
			selection: [],
		},
		dataset_available: {
			operator: "ANY",
			selection: [],
		},
		project_name: {
			operator: "ANY",
			selection: [],
		},
		model_type: {
			operator: "ANY",
			selection: [],
		},
		breast_cancer_biomarkers: {
			operator: "ANY",
			selection: [],
		},
		makers_with_cytogenetics_data: {
			operator: "ANY",
			selection: [],
		},
		makers_with_expression_data: {
			operator: "ANY",
			selection: [],
		},
		markers_with_cna_data: {
			operator: "ANY",
			selection: [],
		},
		markers_with_mutation_data: {
			operator: "ANY",
			selection: [],
		},
		collection_site: {
			operator: "ANY",
			selection: [],
		},
		primary_site: {
			operator: "ANY",
			selection: [],
		},
		patient_ethnicity: {
			operator: "ANY",
			selection: [],
		},
		cancer_system: {
			operator: "ANY",
			selection: [],
		},
		patient_age: {
			operator: "ANY",
			selection: [],
		},
		tumour_type: {
			operator: "ANY",
			selection: [],
		},
		patient_sex: {
			operator: "ANY",
			selection: [],
		},
		treatment_list: {
			operator: "ANY",
			selection: [],
		},
		model_treatment_list: {
			operator: "ANY",
			selection: [],
		},
		patient_treatment_status: {
			operator: "ANY",
			selection: [],
		},
		page: {
			operator: "ANY",
			selection: [],
		},
		search_terms: {
			operator: "ANY",
			selection: [],
		},
	},
	onFilterChange: (filterId, selection, operator, type) => {
		alert(
			JSON.stringify(
				{
					filterId,
					selection,
					operator,
					type,
				},
				undefined,
				2
			)
		);
	},
};
