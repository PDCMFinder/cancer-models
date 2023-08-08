import { ComponentStory, ComponentMeta } from "@storybook/react";
import Input from "./InputAndLabel";

export default {
	title: "UI/Input",
	component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Component = Template.bind({});
Component.args = {
	type: "text",
	label: "Label",
	name: "inputStory",
	onChange: () => alert("change"),
};
