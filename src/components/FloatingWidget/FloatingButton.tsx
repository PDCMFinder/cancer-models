import Button from "../Button/Button";

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
		<Button
			priority="secondary"
			color="dark"
			onClick={() => (onClick ? onClick() : null)}
			className={`bg-white position-fixed ${positionClassNames.join(" ")}`}
		>
			{children}
		</Button>
	);
};

export default FloatingButton;
