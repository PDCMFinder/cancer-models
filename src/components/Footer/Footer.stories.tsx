import { ComponentStory, ComponentMeta } from "@storybook/react";
import Footer from "./Footer";

export default {
	title: "Nav/Footer",
	component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => (
	<Footer cookieConsentHeight={0} />
);

export const main = Template.bind({});
