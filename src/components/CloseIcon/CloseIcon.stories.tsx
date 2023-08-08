import { ComponentStory, ComponentMeta } from "@storybook/react";
import CloseIcon from "./CloseIcon";

export default {
	title: "UI/CloseIcon",
	component: CloseIcon,
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => (
	<CloseIcon {...args} />
);

export const Component = Template.bind({});
Component.args = {
	color: "dark",
	onClick: () => alert("Click"),
};
