import { ComponentMeta, ComponentStory } from "@storybook/react";
import Accordion from "./Accordion";

export default {
	title: "UI/Accordion",
	component: Accordion
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
	<Accordion {...args}>
		<p>This is the content for the accordion</p>
	</Accordion>
);

export const Component = Template.bind({});
Component.args = {
	id: "Accordion id",
	buttonClassName: "bg-gray",
	contentClassName: "bg-lightGray"
};
