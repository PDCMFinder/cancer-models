context("Navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should set correct navbar depending on window width", () => {
		cy.get("[data-test='navbar-desktop']").should("exist");

		cy.viewport("iphone-8");
		cy.get("[data-test='navbar-desktop']").should("not.exist");
		cy.get("[data-test='navbar-mobile']").should("exist");
	});
});
