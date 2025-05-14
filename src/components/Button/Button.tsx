import Link from "next/link";
import React, { CSSProperties, MouseEvent, useState } from "react";
import isExternalLink from "../../utils/isExternalLink";
import ArrowIcon, { ArrowIconProps } from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";

type BaseProps = {
	style?: CSSProperties;
	children: React.ReactNode;
	priority: "primary" | "secondary";
	color: "dark" | "light" | "white";
	className?: string;
	onClick?: () => void;
	onMouseEnter?: (e: MouseEvent<any>) => void;
	onMouseLeave?: (e: MouseEvent<any>) => void;
};

type ButtonTagProps = {
	htmlTag?: "button";
	type?: "button" | "submit" | "reset";
	arrow?: boolean;
	arrowDirection?: ArrowIconProps["direction"];
	"aria-controls"?: string;
	disabled?: boolean;
};

type LinkTagProps = {
	htmlTag: "a";
	href: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
};

type ButtonProps = BaseProps & (ButtonTagProps | LinkTagProps);

const Button: React.FC<ButtonProps> = (props) => {
	const {
		style,
		children,
		priority,
		color,
		className = "",
		onClick,
		onMouseEnter,
		onMouseLeave
	} = props;

	const isButton = props.htmlTag !== "a";
	const showArrow = isButton && (props as ButtonTagProps).arrow;
	const initialDirection: ArrowIconProps["direction"] =
		isButton && (props as ButtonTagProps).arrowDirection
			? (props as ButtonTagProps).arrowDirection!
			: "down";

	const [arrowDirection, setArrowDirection] =
		useState<ArrowIconProps["direction"]>(initialDirection);

	const combinedClassNames = [
		styles.Button,
		styles[`Button-${priority}`],
		styles[`Button-${color}`],
		className,
		"text-left"
	]
		.filter(Boolean)
		.join(" ");

	const handleClick = () => {
		onClick?.();
		if (showArrow) {
			setArrowDirection((prev) => (prev === "down" ? "right" : "down"));
		}
	};

	const sharedProps = {
		style,
		className: combinedClassNames,
		onClick: handleClick,
		onMouseEnter,
		onMouseLeave
	};

	const arrow = showArrow ? <ArrowIcon direction={arrowDirection} /> : null;

	if (isButton) {
		const {
			type = "button",
			disabled,
			["aria-controls"]: ariaControls
		} = props as ButtonTagProps;

		return (
			<button
				{...sharedProps}
				type={type}
				disabled={disabled}
				aria-controls={ariaControls}
			>
				{children}
				{arrow}
			</button>
		);
	}

	const { href, target = "_blank" } = props as LinkTagProps;

	return (
		<Link
			{...sharedProps}
			href={href}
			target={target}
			rel={isExternalLink(href) ? "noreferrer" : undefined}
		>
			<>
				{children}
				{arrow}
			</>
		</Link>
	);
};

export default Button;
