import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchResults from "./SearchResults";
import mockData from "./StoryMockData";
import { useState } from "react";

export default {
	title: "UI/SearchResults",
	component: SearchResults,
} as ComponentMeta<typeof SearchResults>;

const Template: ComponentStory<typeof SearchResults> = (args) => {
	const [modelsToCompare, setModelsToCompare] = useState<string[]>([]);

	const compareModel = (id: string): void => {
		if (modelsToCompare.includes(id)) {
			setModelsToCompare((prev) => prev.filter((model) => model !== id));
		} else {
			if (modelsToCompare.length === 4) {
				alert(
					"You've reached the maximum amount of models to compare. Remove a model to add another."
				);
			} else {
				setModelsToCompare((prev) => [...prev, id]);
			}
		}
	};

	return (
		<SearchResults
			{...args}
			compareModel={compareModel}
			modelsToCompare={modelsToCompare}
		/>
	);
};

export const Component = Template.bind({});
Component.args = {
	data: mockData,
};
