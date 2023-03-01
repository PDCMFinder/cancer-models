import { ComponentStory, ComponentMeta } from "@storybook/react";
import Card from "./Card";
import Button from "../Button/Button";

export default {
	title: "UI/Card",
	component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => (
	<Card {...args}>
		<>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita et
				tempora adipisci quisquam possimus debitis nam aliquid nulla dicta,
				culpa, ea animi ipsa cumque dignissimos. Ducimus, quibusdam assumenda.
				Inventore, eaque!
			</p>
			<Button color="dark" priority="primary">
				Button
			</Button>
		</>
	</Card>
);

export const Primary = Template.bind({});
Primary.args = {
	header: <p className="m-0">Header title</p>,
	footer: <p className="m-0">Footer information</p>,
};
