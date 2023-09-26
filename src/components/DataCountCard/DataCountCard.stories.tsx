import { ComponentStory, ComponentMeta } from "@storybook/react";
import DataCountCard from "./DataCountCard";

export default {
	title: "UI/DataCountCard",
	component: DataCountCard,
} as ComponentMeta<typeof DataCountCard>;

const Template: ComponentStory<typeof DataCountCard> = (args) => (
	<div style={{ width: "300px" }}>
		<DataCountCard layout="horizontal" />
	</div>
);

export const Component = Template.bind({});
