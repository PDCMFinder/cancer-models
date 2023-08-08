import { ComponentStory, ComponentMeta } from "@storybook/react";
import FeedbackSection from "./FeedbackSection";

export default {
	title: "Sections/FeedbackSection",
	component: FeedbackSection,
} as ComponentMeta<typeof FeedbackSection>;

const Template: ComponentStory<typeof FeedbackSection> = (args) => (
	<FeedbackSection {...args} />
);

export const Component = Template.bind({});
