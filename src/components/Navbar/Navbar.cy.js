context("Navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should set correct navbar depending on window width", () => {
		cy.get(".Navbar-desktop_Navbar-desktop__VO3Sj").should("exist");

		cy.viewport("iphone-8");
		cy.get(".Navbar-desktop_Navbar-desktop__VO3Sj").should("not.exist");
		cy.get(".Navbar-mobile_Navbar-mobile__DT0br").should("exist");
	});
});
