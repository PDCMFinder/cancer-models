import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

export default {
	title: "UI/Button",
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
	<Button {...args}>Button</Button>
);

export const Primary = Template.bind({});
Primary.args = {
	priority: "primary",
	color: "dark",
	arrow: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
	priority: "secondary",
	color: "light",
	htmlTag: "a",
	href: "/about",
	arrow: true,
};
