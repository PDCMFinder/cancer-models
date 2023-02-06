import styles from "./SearchResultsLoader.module.scss";
import Card from "../Card/Card";

interface ISearchResultsLoaderProps {
	amount: number;
}

const SearchResultsLoader = (props: ISearchResultsLoaderProps) => {
	const results = [];

	let i = 0;
	while (i <= props.amount) {
		results.push(
			<Card key={i} className={`mb-3 mb-md-2 ${styles.SearchResultSkeleton}`}>
				{" "}
			</Card>
		);
		i++;
	}

	return <div>{results}</div>;
};

export default SearchResultsLoader;
