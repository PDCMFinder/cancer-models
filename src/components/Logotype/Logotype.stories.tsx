import { ComponentStory, ComponentMeta } from "@storybook/react";
import Logotype from "./Logotype";

export default {
	title: "UI/Logotype",
	component: Logotype,
} as ComponentMeta<typeof Logotype>;

const Template: ComponentStory<typeof Logotype> = (args) => (
	<div style={{ width: "400px" }}>
		<Logotype {...args} />
	</div>
);

export const Component = Template.bind({});
Component.args = {
	color: "dark",
};
