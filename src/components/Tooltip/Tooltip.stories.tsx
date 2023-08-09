import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip from "./Tooltip";

export default {
	title: "UI/Tooltip",
	component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
	<div style={{ marginTop: "10rem" }}>
		<Tooltip {...args}>Hover me</Tooltip>
	</div>
);

export const Component = Template.bind({});
Component.args = {
	content: <p className="mb-0">More information on hover</p>,
};
