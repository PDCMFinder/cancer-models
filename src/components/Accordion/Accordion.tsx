import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Accordion.module.scss";

interface IAccordionProps {
	style?: {};
	buttonClassName?: string;
	className?: string;
	id: string;
	content: any;
	contentClassName?: string;
	open?: boolean;
}

const Accordion = (props: IAccordionProps) => {
	const [isOpen, setIsOpen] = useState(props.open);

	let ariaId = props.id.split(" ").join(""),
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
				className={`my-1 w-100 text-bold text-capitalize ${
					isOpen ? styles["Accordion_label-active"] : ""
				} ${buttonClassName} ${styles.Accordion_label}`.trim()}
				aria-controls={ariaId}
				arrow
				onClick={handleAccordionFold}
			>
				{props.id.replace("_", " ")}
			</Button>
			{isOpen && (
				<div className={`px-1 ${contentClassName}`.trim()} id={ariaId}>
					{props.content}
				</div>
			)}
		</div>
	);
};

export default Accordion;
