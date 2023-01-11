import { useState } from "react";
import Button from "../Button/Button";

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
				className={`link-text m-0 pl-0 ${buttonClassName}`.trim()}
				arrow
				aria-controls={ariaId}
				arrowDirection={isOpen ? "down" : "right"}
				onClick={handleAccordionFold}
			>
				{props.id}
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
