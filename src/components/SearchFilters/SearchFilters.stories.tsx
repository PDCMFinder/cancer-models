import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchFilters from "./SearchFilters";
import { mockData, mockSelection } from "./StoryMockData";

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
	selection: mockSelection,
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
