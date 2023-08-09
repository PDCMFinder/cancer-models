import { ComponentStory, ComponentMeta } from "@storybook/react";
import SunBurstChart from "./SunBurstChart";
import mockData from "./StoryMockData";

export default {
	title: "Graphs/SunBurstChart",
	component: SunBurstChart,
} as ComponentMeta<typeof SunBurstChart>;

const Template: ComponentStory<typeof SunBurstChart> = (args) => (
	<div style={{ height: "400px" }}>
		<SunBurstChart {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	data: mockData,
	onSliceClick: (e) => alert(e.data.search_terms),
	keyId: "search_terms",
};
