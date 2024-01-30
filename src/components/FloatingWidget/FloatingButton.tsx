import Button, { IButtonProps } from "../Button/Button";

interface IFloatingButtonProps {
	priority: IButtonProps["priority"];
	color: IButtonProps["color"];
	position?: string;
	className?: string;
	children: string | JSX.Element;
	onClick?: () => void;
}

const FloatingButton = ({
	priority,
	color,
	position = "bottom left",
	className,
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
			priority={priority}
			color={color}
			onClick={() => (onClick ? onClick() : null)}
			className={`position-fixed ${className} ${positionClassNames.join(" ")}`}
		>
			{children}
		</Button>
	);
};

export default FloatingButton;
