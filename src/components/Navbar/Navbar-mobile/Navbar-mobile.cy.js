context("Mobile navbar", () => {
	beforeEach(() => {
		cy.visit("", {
			onBeforeLoad(win) {
				win.localStorage.setItem("seen_notice", true);
			}
		});
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
