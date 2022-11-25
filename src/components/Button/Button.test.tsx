import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { expect } from "@jest/globals";

import Button from "./Button";

describe("UI Button component", () => {
  it("should render a button with text", () => {
    const text = "Click me";

    render(<Button text={text} />);

    const button = screen.getByRole("button");

    expect(button).toBeTruthy();
    expect(button.textContent).toBe("text");
  });
});
