import { ComponentStory, ComponentMeta } from "@storybook/react";
import ArrowIcon from "./ArrowIcon";

export default {
	title: "UI/ArrowIcon",
	component: ArrowIcon,
} as ComponentMeta<typeof ArrowIcon>;

const Template: ComponentStory<typeof ArrowIcon> = (args) => (
	<ArrowIcon {...args} />
);

export const Component = Template.bind({});
Component.args = {};
