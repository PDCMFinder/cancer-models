context("Desktop navbar", () => {
	beforeEach(() => {
		cy.visit("");
		cy.setCookie(
			"cm_consent",
			JSON.stringify({ ga: "accepted", hj: "accepted" })
		);
		cy.reload();
	});

	it("should create dropdowns for parent/children elements", () => {
		// assuming we do have a dropdown (which we do at the time of this test)
		if (cy.get("[data-test='navbar-desktop-dropdownParent']")) {
			cy.get("[data-test='navbar-desktop-dropdownParent']").realHover();
			cy.get("[data-test='navbar-desktop-dropdownChildren']").should(
				"have.css",
				"display",
				"flex"
			);
			cy.get("[data-test='navbar-desktop-dropdownChildren'] li").should(
				"exist"
			);
		}
	});
});
