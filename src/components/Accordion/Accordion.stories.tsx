import { ComponentStory, ComponentMeta } from "@storybook/react";
import Accordion from "./Accordion";

export default {
	title: "UI/Accordion",
	component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
	<Accordion {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	id: "Accordion id",
	content: <p>This is the content for the accordion</p>,
	buttonClassName: "bg-gray",
	contentClassName: "bg-lightGray",
};
