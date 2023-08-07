import { ComponentStory, ComponentMeta } from "@storybook/react";
import QualityBadge from "./QualityBadge";

export default {
	title: "UI/QualityBadge",
	component: QualityBadge,
} as ComponentMeta<typeof QualityBadge>;

const Template: ComponentStory<typeof QualityBadge> = (args) => (
	<QualityBadge {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
	score: 90,
};
