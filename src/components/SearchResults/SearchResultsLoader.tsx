import styles from "./SearchResultsLoader.module.scss";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

interface ISearchResultsLoaderProps {
	amount: number;
}

const SearchResultsLoader = (props: ISearchResultsLoaderProps) => {
	const results = [];

	let i = 0;
	while (i < props.amount) {
		results.push(
			<Card
				key={i}
				contentClassName="h-100"
				className={`mb-3 mb-md-2 ${styles.SearchResultSkeleton}`}
			>
				<Loader />
			</Card>
		);
		i++;
	}

	return <div>{results}</div>;
};

export default SearchResultsLoader;
