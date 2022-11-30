describe("button component", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it.only("displays correct button component", () => {
    cy.get("button")
      .should("have.text", "Don't click me")
      .click()
      .should("have.text", "I've been clicked");
  });
});
