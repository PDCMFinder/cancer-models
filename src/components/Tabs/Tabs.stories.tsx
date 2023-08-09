import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tabs from "./Tabs";
import Tab from "./Tab";

export default {
	title: "UI/Tabs",
	component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
	<Tabs {...args}>
		<Tab
			key="firstTab"
			label="First tab"
			content={<p>This is the content for the first tab</p>}
		/>
		<Tab
			key="secondTab"
			label="Second tab"
			content={<p>Second tab content</p>}
		/>
	</Tabs>
);

export const Component = Template.bind({});
Component.args = {
	packedLabels: true,
};
