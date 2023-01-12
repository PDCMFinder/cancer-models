context("Mobile navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should open and close menu tray", () => {
		cy.viewport("iphone-8");
		cy.get(".Navbar-mobile_Navbar-mobile__DT0br button")
			.should("contain", "Menu")
			.click();
		cy.get(".Navbar-mobile_Navbar-mobile_menu__t4pF_").should("exist");
		cy.get(".Navbar-mobile_Navbar-mobile__DT0br button").realTouch();
	});
});
