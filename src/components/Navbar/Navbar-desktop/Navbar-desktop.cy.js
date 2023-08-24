context("Desktop navbar", () => {
	beforeEach(() => {
		cy.visit("");
		cy.setCookie("CookieFeedback", "true");
		cy.reload();
	});

	it("should create dropdowns for parent/children elements", () => {
		// assuming we do have (which we do at the time of this test)
		if (cy.get(".dropdownParent")) {
			cy.get(".dropdownParent").realHover();
			cy.get(".dropdownChildren").should("have.css", "display", "flex");
			cy.get(".dropdownChildren li").should("exist");
		}
	});
});
