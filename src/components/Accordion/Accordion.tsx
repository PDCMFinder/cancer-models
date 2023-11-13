import { CSSProperties, useState } from "react";
import Button from "../Button/Button";
import styles from "./Accordion.module.scss";

interface IAccordionProps {
	style?: CSSProperties;
	buttonClassName?: string;
	className?: string;
	id: string;
	content: any;
	contentClassName?: string;
	open?: boolean;
}

const Accordion = (props: IAccordionProps) => {
	const [isOpen, setIsOpen] = useState(props.open);

	const ariaId = props.id.split(" ").join(""),
		contentClassName = props.contentClassName ?? "",
		buttonClassName = props.buttonClassName ?? "";

	const handleAccordionFold = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={props.className} style={props.style}>
			<Button
				color="dark"
				priority="secondary"
				className={`mt-1 mb-0 w-100 text-capitalize bc-transparent ${
					isOpen ? styles["Accordion_label-active"] : ""
				} ${buttonClassName} ${styles.Accordion_label}`.trim()}
				aria-controls={ariaId}
				arrow
				arrowDirection={isOpen ? "right" : "down"}
				onClick={handleAccordionFold}
			>
				{props.id}
			</Button>
			<div id={ariaId}>
				{isOpen && (
					<div className={`px-1 ${contentClassName}`.trim()}>
						{props.content}
					</div>
				)}
			</div>
		</div>
	);
};

export default Accordion;
