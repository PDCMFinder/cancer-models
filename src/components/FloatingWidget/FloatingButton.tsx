import Button, { ButtonProps } from "../Button/Button";

type FloatingButtonProps = {
	priority: ButtonProps["priority"];
	color: ButtonProps["color"];
	position?: string;
	className?: string;
	children: JSX.Element;
	onClick?: () => void;
	fromTop?: number; // px
	fromRight?: number; // px
	fromBottom?: number; // px
	fromLeft?: number; // px
};

const FloatingButton = ({
	priority,
	color,
	position = "bottom left",
	className,
	children,
	onClick,
	fromTop,
	fromRight,
	fromBottom,
	fromLeft
}: FloatingButtonProps) => {
	const positionClassMap: { [key: string]: string } = {
		bottom: "bottom-0",
		left: "left-margin",
		right: "right-margin",
		top: "top-0"
	};

	let positionClassNames: string[] = [];

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
			style={{
				top: fromTop !== undefined ? `${fromTop}px !important` : undefined,
				right:
					fromRight !== undefined ? `${fromRight}px !important` : undefined,
				bottom:
					fromBottom !== undefined ? `${fromBottom}px !important` : undefined,
				left: fromLeft !== undefined ? `${fromLeft}px !important` : undefined
			}}
		>
			{children}
		</Button>
	);
};

export default FloatingButton;
