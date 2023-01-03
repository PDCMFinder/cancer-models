import styles from "./Card.module.scss";

interface ICardProps {
	className?: string;
	header?: JSX.Element;
	headerClassName?: string;
	children: string | JSX.Element | JSX.Element[];
	footer?: JSX.Element;
	footerClassName?: string;
}

const Card = (props: ICardProps) => {
	let cardClassName = props.className,
		header = props.header,
		headerClassName = props.headerClassName,
		footer = props.footer,
		footerClassName = props.footerClassName;

	return (
		<div
			className={`${styles.Card} ${cardClassName ? cardClassName : ""}`.trim()}
		>
			{header && (
				<div
					className={`${styles.Card_header} ${
						headerClassName ? headerClassName : ""
					}`.trim()}
				>
					{header}
				</div>
			)}
			<div className={styles.Card_content}>{props.children}</div>
			{footer && (
				<div
					className={`${styles.Card_footer} ${
						footerClassName ? footerClassName : ""
					}`.trim()}
				>
					{footer}
				</div>
			)}
		</div>
	);
};

export default Card;
