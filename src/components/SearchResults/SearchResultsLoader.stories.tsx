import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchResultsLoader from "./SearchResultsLoader";

export default {
	title: "UI/SearchResults/Loader",
	component: SearchResultsLoader,
} as ComponentMeta<typeof SearchResultsLoader>;

const Template: ComponentStory<typeof SearchResultsLoader> = (args) => (
	<SearchResultsLoader {...args} />
);

export const Component = Template.bind({});
Component.args = {
	amount: 5,
};
