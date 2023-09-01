context("Mobile navbar", () => {
	beforeEach(() => {
		cy.visit("");
		cy.setCookie("CookieFeedback", "true");
		cy.reload();
	});

	it("should open and close menu tray", () => {
		cy.viewport("iphone-8");
		cy.get(".Navbar-mobile_Navbar-mobile__1mR5D button")
			.should("contain", "Menu")
			.click();
		cy.get(".Navbar-mobile_Navbar-mobile_menu__UL_M7").should("exist");
		cy.get(".Navbar-mobile_Navbar-mobile__1mR5D button").realTouch();
	});
});
