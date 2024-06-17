import { ComponentMeta, ComponentStory } from "@storybook/react";
import CookieConsent from "./CookieConsent";

export default {
	title: "UI/CookieConsent",
	component: CookieConsent
} as ComponentMeta<typeof CookieConsent>;

const Template: ComponentStory<typeof CookieConsent> = () => <CookieConsent />;

export const Component = Template.bind({});
Component.args = {};
