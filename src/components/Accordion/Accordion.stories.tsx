import { ComponentMeta, ComponentStory } from "@storybook/react";
import Accordion, { AccordionProps } from "./Accordion";
import AccordionItem from "./AccordionItem";

export default {
	title: "UI/Accordion",
	component: Accordion
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args: AccordionProps) => (
	<Accordion {...args}>
		<AccordionItem title="Accordion title">
			<p>This is the content for the accordion</p>
		</AccordionItem>
	</Accordion>
);

export const Component = Template.bind({});
Component.args = {
	allowMultipleOpen: true
};
