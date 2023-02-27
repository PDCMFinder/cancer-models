import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { expect } from "@jest/globals";
import Button from "./Button";

describe("Button UI component", () => {
	it("should render a button with text", () => {
		render(
			<Button color="dark" priority="aa" htmlTag="button">
				Button text
			</Button>
		);

		const button = screen.getByRole("button");

		expect(button).toBeTruthy();
		expect(button.textContent).toBe("Button text");
	});

	it("should render the component with anchor tag", () => {
		render(
			<Button color="dark" priority="aa" htmlTag="a" href="/">
				Button text
			</Button>
		);

		expect(screen.getByRole("link")).toBeTruthy();
	});

	it("should set external link target to new window", () => {
		render(
			<Button
				color="dark"
				priority="aa"
				htmlTag="a"
				href="https://cancermodels.org"
			>
				Button text
			</Button>
		);

		expect(screen.getByRole("link").getAttribute("target")).toBe("_blank");
	});
});
