import { ComponentStory, ComponentMeta } from "@storybook/react";
import NavMobile from "./Navbar--mobile";
import { routes } from "../../../utils/routes";

export default {
	title: "Nav/Navbar",
	component: NavMobile,
} as ComponentMeta<typeof NavMobile>;

const Template: ComponentStory<typeof NavMobile> = () => (
	<NavMobile routes={routes} />
);

export const mobile = Template.bind({});
