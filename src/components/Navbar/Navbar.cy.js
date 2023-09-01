context("Navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should set correct navbar depending on window width", () => {
		cy.get(".Navbar-desktop_Navbar-desktop__KOH09").should("exist");

		cy.viewport("iphone-8");
		cy.get(".Navbar-desktop_Navbar-desktop__KOH09").should("not.exist");
		cy.get(".Navbar-mobile_Navbar-mobile__DT0br").should("exist");
	});
});
