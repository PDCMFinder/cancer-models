import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchResults from "./SearchResults";
import mockData from "./StoryMockData";

export default {
	title: "UI/SearchResults",
	component: SearchResults,
} as ComponentMeta<typeof SearchResults>;

const Template: ComponentStory<typeof SearchResults> = (args) => (
	<SearchResults {...args} />
);

export const Component = Template.bind({});
Component.args = {
	modelsToCompare: [],
	compareModel: () => {},
	data: mockData,
};
