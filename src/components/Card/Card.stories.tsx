import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "../Button/Button";
import Card from "./Card";

export default {
	title: "UI/Card",
	component: Card
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

export const Component = Template.bind({});
Component.args = {
	header: <p className="m-0">Header title</p>,
	footer: <p className="m-0">Footer information</p>
};
