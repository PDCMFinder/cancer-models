context("Navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should set correct navbar depending on window width", () => {
		cy.get(".Navbar--desktop_Navbar--desktop__Ni9nT").should("exist");

		cy.viewport("iphone-8");
		cy.get(".Navbar--desktop_Navbar--desktop__Ni9nT").should("not.exist");
		cy.get(".Navbar--mobile_Navbar--mobile__0mW4z").should("exist");
	});
});
