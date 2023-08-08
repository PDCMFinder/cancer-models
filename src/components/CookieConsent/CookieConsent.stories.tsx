import { ComponentStory, ComponentMeta } from "@storybook/react";
import CookieConsent from "./CookieConsent";

export default {
	title: "UI/CookieConsent",
	component: CookieConsent,
} as ComponentMeta<typeof CookieConsent>;

const Template: ComponentStory<typeof CookieConsent> = (args) => (
	<CookieConsent {...args} />
);

export const Component = Template.bind({});
Component.args = {
	setCookieConsentHeight: () => {},
};
