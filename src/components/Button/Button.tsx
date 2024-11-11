import Link from "next/link";
import React, { CSSProperties, MouseEvent, useState } from "react";
import isExternalLink from "../../utils/isExternalLink";
import ArrowIcon, { ArrowIconProps } from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";

export type ButtonProps = {
	style?: CSSProperties;
	children: React.ReactNode;
	priority: "primary" | "secondary";
	color: "dark" | "light" | "white";
	className?: string;
	onClick?: () => void;
	onMouseEnter?: (
		e: MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>
	) => void;
	onMouseLeave?: (
		e: MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>
	) => void;
} & (ButtonProperties | LinkProperties);

type ButtonProperties = {
	htmlTag?: "button";
	type?: "button" | "submit" | "reset";
	arrow?: boolean;
	arrowDirection?: ArrowIconProps["direction"];
	"aria-controls"?: string;
	disabled?: boolean;
};

type LinkProperties = {
	htmlTag: "a";
	href: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
};

const DOWN: ArrowIconProps["direction"] = "down";
const RIGHT: ArrowIconProps["direction"] = "right";

const isButtonProps = (
	props: ButtonProps
): props is ButtonProps & ButtonProperties => {
	return props.htmlTag === "a" ? false : props.htmlTag === "button";
};

const Button = ({ htmlTag = "button", ...props }: ButtonProps) => {
	const retypedButtonProps = props as ButtonProps & ButtonProperties;
	const retypedLinkProps = props as ButtonProps & LinkProperties;
	const [arrowDirection, setArrowDirection] = useState<
		ArrowIconProps["direction"]
	>(isButtonProps(props) && props.arrowDirection ? props.arrowDirection : DOWN);

	let children = props.children,
		showArrow = isButtonProps(props) && props.arrow,
		propsClassName = props.className,
		classNames = `${styles.Button} ${styles[`Button-${props.priority}`]} ${
			styles[`Button-${props.color}`]
		} ${propsClassName ? propsClassName : ""} text-left
    `.trim();

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

	if (htmlTag === "button") {
		return (
			<button
				disabled={retypedButtonProps.disabled}
				style={retypedButtonProps.style}
				aria-controls={retypedButtonProps["aria-controls"]}
				type={retypedButtonProps.type ?? "button"}
				className={classNames}
				onClick={handleOnClick}
				onMouseEnter={(e) =>
					retypedButtonProps.onMouseEnter && retypedButtonProps.onMouseEnter(e)
				}
				onMouseLeave={(e) =>
					retypedButtonProps.onMouseLeave && retypedButtonProps.onMouseLeave(e)
				}
			>
				{children}
				{showArrow && <ArrowIcon direction={arrowDirection} />}
			</button>
		);
	}

	const linkTarget = retypedLinkProps.target ?? "_blank";

	return (
		<Link
			style={retypedLinkProps.style}
			className={classNames}
			href={retypedLinkProps.href}
			onClick={handleOnClick}
			target={linkTarget}
			onMouseEnter={(e) =>
				retypedLinkProps.onMouseEnter && retypedLinkProps.onMouseEnter(e)
			}
			onMouseLeave={(e) =>
				retypedLinkProps.onMouseLeave && retypedLinkProps.onMouseLeave(e)
			}
			{...(isExternalLink(retypedLinkProps.href)
				? { rel: "noreferrer" }
				: null)}
		>
			<>
				{children}
				{showArrow && <ArrowIcon direction={arrowDirection} />}
			</>
		</Link>
	);
};

export default Button;
