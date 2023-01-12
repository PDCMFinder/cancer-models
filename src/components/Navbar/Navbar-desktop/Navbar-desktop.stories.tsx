import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavDesktop from "./Navbar-desktop";
import { routes } from "../../../utils/routes";

export default {
	title: "Nav/Navbar",
	component: NavDesktop,
} as ComponentMeta<typeof NavDesktop>;

const Template: ComponentStory<typeof NavDesktop> = () => (
	<NavDesktop routes={routes} />
);

export const desktop = Template.bind({});
