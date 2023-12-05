const path = "/submit";

context("ActiveLink", () => {
	beforeEach(() => {
		cy.visit(path);
	});

	it("should set current page nav link class", () => {
		// same path as beforeEach visit so it's current page user is in
		cy.get(`a[href="${path}"]`)
			.should("have.attr", "data-test")
			.and("equals", "activeLink-active");
	});
});
