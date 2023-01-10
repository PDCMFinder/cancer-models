context("Mobile navbar", () => {
	beforeEach(() => {
		cy.visit("");
	});

	it("should open and close menu tray", () => {
		cy.viewport("iphone-8");
		cy.get(".Navbar-mobile_Navbar-mobile__0mW4z button")
			.should("contain", "Menu")
			.click();
		cy.get(".Navbar-mobile_Navbar-mobile_menu__d3h6V").should("exist");
		cy.get(".Navbar-mobile_Navbar-mobile__0mW4z button").realTouch();
	});
});
