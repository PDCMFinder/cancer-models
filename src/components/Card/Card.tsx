import { CSSProperties } from "react";
import styles from "./Card.module.scss";

type CardProps = {
	className?: string;
	id?: string;
	header?: JSX.Element;
	headerClassName?: string;
	children: React.ReactNode | React.ReactNode[];
	contentClassName?: string;
	footer?: JSX.Element;
	footerClassName?: string;
	style?: CSSProperties;
	"data-test"?: string;
};

const Card = (props: CardProps) => {
	let cardClassName = props.className,
		header = props.header,
		headerClassName = props.headerClassName ? props.headerClassName : "",
		contentClassName = props.contentClassName ? props.contentClassName : "",
		footer = props.footer,
		footerClassName = props.footerClassName ? props.footerClassName : "";

	return (
		<div
			className={`${styles.Card} ${cardClassName ? cardClassName : ""}`.trim()}
			style={props.style}
			id={props.id || undefined}
			data-test={props["data-test"]}
		>
			{header && (
				<div className={`${styles.Card_header} ${headerClassName}`.trim()}>
					{header}
				</div>
			)}
			<div className={`${styles.Card_content} ${contentClassName}`.trim()}>
				{props.children}
			</div>
			{footer && (
				<div className={`${styles.Card_footer} ${footerClassName}`.trim()}>
					{footer}
				</div>
			)}
		</div>
	);
};

export default Card;
