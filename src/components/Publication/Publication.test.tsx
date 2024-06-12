import { render } from "@testing-library/react";
import mockPublication from "./mockData";
import Publication from "./Publication";

describe("Publication UI component", () => {
	it("should add separator if there are multiple publications", () => {
		const publicationsData = [
			mockPublication,
			mockPublication,
			mockPublication
		];
		const publications = publicationsData.map((data, idx) => {
			const needsSeparator = idx !== publicationsData.length - 1;

			return <Publication data={data} needsSeparator={needsSeparator} />;
		});

		render(publications);

		// Expect all except last element to include "hr"
	});
});
