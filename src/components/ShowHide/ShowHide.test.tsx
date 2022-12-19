import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { expect } from "@jest/globals";
import ShowHide from "./ShowHide";

describe("ShowHide responsive component", () => {
	it("should show above certain window width", () => {
		render(
			<ShowHide windowWidth={window.outerWidth} showOver={767}>
				<h1>ShowHide</h1>
			</ShowHide>
		);

		expect(
			screen.getByRole("heading", { level: 1, hidden: true })
		).toBeTruthy();
	});

	// it("should hide above certain window width", () => {
	// 	render(
	// 		<ShowHide windowWidth={window.innerWidth} hideOver={992}>
	// 			<h1>ShowHide</h1>
	// 		</ShowHide>
	// 	);

	// 	expect(
	// 		screen.getAllByRole("heading", { level: 1, hidden: true })
	// 	).toBeInTheDocument();
	// });
});
