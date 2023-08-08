import { ComponentStory, ComponentMeta } from "@storybook/react";
import Navbar from "./Navbar";

export default {
	title: "Nav/Navbar",
	component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Responsive = Template.bind({});
