import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pagination from "./Pagination";
import { useState } from "react";

export default {
	title: "UI/Pagination",
	component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
	const [page, setPage] = useState(1);

	return (
		<Pagination
			{...args}
			currentPage={page}
			onPageChange={(page) => setPage(page)}
		/>
	);
};

export const Component = Template.bind({});
Component.args = {
	totalPages: 100,
};
