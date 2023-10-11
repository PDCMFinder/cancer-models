import { ComponentStory, ComponentMeta } from "@storybook/react";
import InformationIcon from "./InformationIcon";

export default {
	title: "UI/InformationIcon",
	component: InformationIcon,
} as ComponentMeta<typeof InformationIcon>;

const Template: ComponentStory<typeof InformationIcon> = () => (
	<div style={{ marginTop: "10rem" }}>
		<InformationIcon information="Patient Ethnic group. Can be derived from self-assement or genetic analysis." />
	</div>
);

export const main = Template.bind({});
