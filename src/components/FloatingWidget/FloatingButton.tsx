import Button from "../Button/Button";
import styles from "./FloatingButton.module.scss";

interface IFloatingButtonProps {
	position?: string;
	children: string;
	onClick?: () => void;
}

const FloatingButton = ({
	position = "bottom left",
	children,
	onClick,
}: IFloatingButtonProps) => {
	let positionClassNames: string[] = [];

	if (position.includes("bottom")) {
		positionClassNames.push("bottom-0");
	}
	if (position.includes("left")) {
		positionClassNames.push("left-margin");
	}
	if (position.includes("right")) {
		positionClassNames.push("right-margin");
	}
	if (position.includes("top")) {
		positionClassNames.push("top-0");
	}

	return (
		<div className={`position-fixed ${positionClassNames.join(" ")}`}>
			<Button
				priority="secondary"
				color="dark"
				onClick={() => (onClick ? onClick() : null)}
				className="bg-white"
			>
				{children}
			</Button>
		</div>
	);
};

export default FloatingButton;
