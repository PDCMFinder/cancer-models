import { ComponentStory, ComponentMeta } from "@storybook/react";
import DonutChart from "./DonutChart";
import mockData from "./StoryMockData";

export default {
	title: "Graphs/DonutChart",
	component: DonutChart,
} as ComponentMeta<typeof DonutChart>;

const Template: ComponentStory<typeof DonutChart> = (args) => (
	<div style={{ height: "400px" }}>
		<DonutChart {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	data: mockData,
	onSliceClick: () => alert("Click"),
	keyId: "patient_age",
};
