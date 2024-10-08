import Button, { IButtonProps } from "../Button/Button";

interface IFloatingButtonProps {
	priority: IButtonProps["priority"];
	color: IButtonProps["color"];
	position?: string;
	className?: string;
	children: JSX.Element;
	onClick?: () => void;
}

const FloatingButton = ({
	priority,
	color,
	position = "bottom left",
	className,
	children,
	onClick
}: IFloatingButtonProps) => {
	const positionClassMap: { [key: string]: string } = {
		bottom: "bottom-0",
		left: "left-margin",
		right: "right-margin",
		top: "top-0"
	};

	const positionClassNames: string[] = [];

	Object.keys(positionClassMap).forEach((key) => {
		if (position.includes(key)) {
			positionClassNames.push(positionClassMap[key]);
		}
	});

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
