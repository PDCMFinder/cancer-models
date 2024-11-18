import useWindowDimensions from "../../hooks/useWindowDimensions";
import breakPoints from "../../utils/breakpoints";
import styles from "./Pagination.module.scss";

type PaginationProps = {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
	const { windowWidth } = useWindowDimensions();
	const bpLarge = breakPoints.large,
		isMobile = windowWidth && windowWidth < bpLarge,
		totalPages = props.totalPages,
		currentPage = props.currentPage,
		onPageChange = props.onPageChange,
		allPages = Array.from({ length: totalPages }, (_, i) => i + 1),
		firstAndLast = [1, totalPages],
		startPadding = currentPage < 5 ? 5 - currentPage : 2,
		endPadding =
			currentPage > totalPages - 4 ? currentPage - (totalPages - 4) : 2,
		prevAndNext = allPages.filter(
			(page) =>
				page <= currentPage + startPadding && page >= currentPage - endPadding
		);

	return (
		<div className={styles.Pagination}>
			<button
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				{isMobile ? "<" : "Previous"}
			</button>
			<button
				onClick={() => onPageChange(1)}
				className={
					currentPage === 1 ? styles["Pagination_button-active"] : undefined
				}
			>
				1
			</button>
			{currentPage >= 5 ? <button disabled>...</button> : null}
			{allPages.map((page) => {
				if (prevAndNext.includes(page) && !firstAndLast.includes(page)) {
					return (
						<button
							key={page}
							className={
								page === currentPage
									? styles["Pagination_button-active"]
									: undefined
							}
							onClick={() => onPageChange(page)}
						>
							{page}
						</button>
					);
				} else {
					return null;
				}
			})}
			{currentPage <= totalPages - 4 ? <button disabled>...</button> : null}
			{totalPages > 1 ? (
				<button
					onClick={() => onPageChange(totalPages)}
					className={
						currentPage === totalPages
							? styles["Pagination_button-active"]
							: undefined
					}
				>
					{totalPages}
				</button>
			) : null}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				{isMobile ? ">" : "Next"}
			</button>
		</div>
	);
};

export default Pagination;
