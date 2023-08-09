import { ComponentStory, ComponentMeta } from "@storybook/react";
import CirclePacking from "./CirclePacking";
import mockData from "./StoryMockData";

export default {
	title: "Graphs/CirclePacking",
	component: CirclePacking,
} as ComponentMeta<typeof CirclePacking>;

const Template: ComponentStory<typeof CirclePacking> = (args) => (
	<div style={{ height: "400px" }}>
		<CirclePacking {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	data: mockData,
	onCircleClick: () => alert("Click"),
};
