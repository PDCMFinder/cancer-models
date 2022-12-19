import { ComponentStory, ComponentMeta } from "@storybook/react";
import Navbar from "./Navbar";

export default {
	title: "Nav/Navbar/Main",
	component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const main = Template.bind({});
