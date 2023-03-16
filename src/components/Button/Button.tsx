import Link from "next/link";
import { CSSProperties, useState } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";
import { IArrowIconProps } from "../ArrowIcon/ArrowIcon";

const RIGHT = "right",
	DOWN = "down";

interface IButtonProps {
	style?: CSSProperties;
	children: string | JSX.Element;
	priority: "primary" | "secondary";
	color: "dark" | "light" | "white";
	htmlTag?: "a" | "button";
	type?: "button" | "submit" | "reset";
	href?: string;
	className?: string;
	arrow?: boolean;
	disabled?: boolean;
	arrowDirection?: IArrowIconProps["direction"];
	"aria-controls"?: string;
	onClick?: () => void;
}

const Button = (props: IButtonProps) => {
	const [arrowDirection, setArrowDirection] = useState<
		IArrowIconProps["direction"]
	>(props.arrowDirection ?? DOWN);

	let href = props.href,
		children = props.children,
		showArrow = props.arrow,
		LinkTag: typeof Link | string = Link,
		propsClassName = props.className,
		classNames = `
      ${styles.Button}
      ${styles[`Button-${props.priority}`]}
      ${styles[`Button-${props.color}`]}
      ${propsClassName ? propsClassName : ""}
    `.trim(),
		externalLinkProps = null;

	const handleOnClick = () => {
		if (props.onClick) props.onClick();
		if (showArrow) {
			if (arrowDirection === DOWN) {
				setArrowDirection(RIGHT);
			} else if (arrowDirection === RIGHT) {
				setArrowDirection(DOWN);
			} else {
				setArrowDirection(DOWN);
			}
		}
	};

	if (props.htmlTag === "a" && href) {
		if (href.includes("https://") || href.includes("http://")) {
			LinkTag = "a";
			externalLinkProps = {
				target: "_blank",
				rel: "noopener noreferrer",
			};
		}

		return (
			<LinkTag
				style={props.style}
				className={classNames}
				href={href}
				{...externalLinkProps}
			>
				<>
					{children}
					{showArrow && <ArrowIcon direction={arrowDirection} />}
				</>
			</LinkTag>
		);
	}

	return (
		<button
			disabled={props.disabled}
			style={props.style}
			aria-controls={props["aria-controls"]}
			type={props.type}
			className={classNames}
			onClick={handleOnClick}
		>
			{children}
			{showArrow && <ArrowIcon direction={arrowDirection} />}
		</button>
	);
};

export default Button;
