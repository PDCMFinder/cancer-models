import { ComponentStory, ComponentMeta } from "@storybook/react";
import Loader from "./Loader";

export default {
	title: "UI/Loader",
	component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Component = Template.bind({});
