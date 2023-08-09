import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
	title: "UI/Button",
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Button</Button>
);

export const Component = Template.bind({});
Component.args = {
	priority: "primary",
	color: "dark",
	arrow: false,
};
