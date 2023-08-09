import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchBar from "./SearchBar";
import { onFilterChangeType } from "../../pages/search";

export default {
	title: "UI/SearchBar",
	component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
	<SearchBar {...args} />
);

export const Component = Template.bind({});
Component.args = {
	isMulti: true,
	onFilterChange: (
		facetId: string,
		selection: string,
		operator: string,
		type: onFilterChangeType["type"]
	) =>
		alert(JSON.stringify({ facetId, selection, operator, type }, undefined, 2)),
};
