import { useEffect } from "react";
import SearchResult from "./SearchResult/SearchResult";
import styles from "./SearchResults.module.scss";

const RESIZE = "resize";

interface ISearchResultsProps {
	resultsAmount: number;
	resultsData: {
		patient_age: string;
		patient_sex: string;
		external_model_id: string;
		model_type: string;
		data_source: string;
		histology: string;
		primary_site: string;
		collection_site: string;
		tumour_type: string;
		dataset_available: string[];
	}[];
}

const SearchResults = (props: ISearchResultsProps) => {
	useEffect(() => {
		/**
		 * Set appropriate spanning to any masonry item
		 *
		 * Get different properties we already set for the masonry, calculate
		 * height or spanning for any cell of the masonry grid based on its
		 * content-wrapper's height, the (row) gap of the grid, and the size
		 * of the implicit row tracks.
		 *
		 * @param item Object A brick/tile/cell inside the masonry
		 */
		function resizeMasonryItem(item: any) {
			/* Get the grid object, its row-gap, and the size of its implicit rows */
			var grid = document.getElementsByClassName("masonry")[0],
				rowGap = parseInt(
					window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
				),
				rowHeight = parseInt(
					window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
				);

			/*
			 * Spanning for any brick = S
			 * Grid's row-gap = G
			 * Size of grid's implicitly create row-track = R
			 * Height of item content = H
			 * Net height of the item = H1 = H + G
			 * Net height of the implicit row-track = T = G + R
			 * S = H1 / T
			 */
			var rowSpan = Math.ceil(
				(item.querySelector(".masonry_content").getBoundingClientRect().height +
					rowGap) /
					(rowHeight + rowGap)
			);

			/* Set the spanning as calculated above (S) */
			item.style.gridRowEnd = "span " + rowSpan;
		}

		/**
		 * Apply spanning to all the masonry items
		 *
		 * Loop through all the items and apply the spanning to them using
		 * `resizeMasonryItem()` function.
		 *
		 * @uses resizeMasonryItem
		 */
		function resizeAllMasonryItems() {
			// Get all item class objects in one list
			var allItems = document.getElementsByClassName("masonry_item");

			/*
			 * Loop through the above list and execute the spanning function to
			 * each list-item (i.e. each masonry item)
			 */
			for (var i = 0; i < allItems.length; i++) {
				resizeMasonryItem(allItems[i]);
			}
		}

		resizeAllMasonryItems();
		window.addEventListener(RESIZE, resizeAllMasonryItems);

		return () => window.removeEventListener(RESIZE, resizeAllMasonryItems);
	}, []);

	return (
		<div className={`${styles.SearchResults} masonry`}>
			{/* TODO: Use resultsAmount to paginate */}
			{props.resultsData.map((result) => (
				<SearchResult
					key={result.external_model_id}
					data={result}
					className="masonry_item mb-2 mb-md-0"
				/>
			))}
		</div>
	);
};

export default SearchResults;
