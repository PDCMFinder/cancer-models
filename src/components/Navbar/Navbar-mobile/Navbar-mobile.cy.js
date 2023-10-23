context("Mobile navbar", () => {
	beforeEach(() => {
		cy.visit("");
		cy.setCookie("cm_feedback", "true");
		cy.reload();
	});

	it("should open and close menu tray", () => {
		cy.viewport("iphone-8");
		cy.get("[data-test='navbar-mobile'] button")
			.should("contain", "Menu")
			.click();
		cy.get("[data-test='navbar-mobile-menu']").should("exist");
		cy.get("[data-test='navbar-mobile'] button").realTouch();
	});
});
