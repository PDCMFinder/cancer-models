context("ActiveLink", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should set current page nav link class", () => {
		cy.get('a[href="/"]').should(
			"have.class",
			"Navbar-desktop_Navbar_item_link-active__KStUs"
		);
	});
});
