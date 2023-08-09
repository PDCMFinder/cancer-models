import { ComponentStory, ComponentMeta } from "@storybook/react";
import BarChart from "./BarChart";
import mockData from "./StoryMockData";

export default {
	title: "Graphs/BarChart",
	component: BarChart,
} as ComponentMeta<typeof BarChart>;

const Template: ComponentStory<typeof BarChart> = (args) => (
	<div style={{ height: "400px" }}>
		<BarChart {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	chartTitle: "Models by mutation data",
	data: mockData,
	onBarClick: () => alert("Click"),
	indexKey: "makers_with_mutation_data",
};
