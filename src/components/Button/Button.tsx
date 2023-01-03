import Link from "next/link";
import { ReactNode } from "react";
import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./Button.module.scss";

interface IButtonProps {
	children: any;
	priority: "primary" | "secondary";
	color: "dark" | "light" | "white";
	htmlTag?: "a" | "button";
	type?: "button" | "submit" | "reset";
	href?: string;
	className?: string;
	arrow?: boolean;
	onClick?: () => void;
}

const Button = (props: IButtonProps) => {
	let href = props.href,
		children = props.children,
		showArrow = props.arrow,
		LinkTag: typeof Link | string = Link,
		propsClassName = props.className,
		classNames = `
      ${styles.Button}
      ${styles[`Button--${props.priority}`]}
      ${styles[`Button--${props.color}`]}
      ${propsClassName ? propsClassName : ""}
    `.trim(),
		externalLinkProps;

	if (props.htmlTag === "a" && href) {
		if (href.includes("https://") || href.includes("http://")) {
			LinkTag = "a";
			externalLinkProps = {
				target: "_blank",
				rel: "noopener noreferrer",
			};
		}

		return (
			<LinkTag className={classNames} href={href} {...externalLinkProps}>
				<>
					{children}
					{showArrow && <ArrowIcon />}
				</>
			</LinkTag>
		);
	}

	return (
		<button type={props.type} className={classNames} onClick={props.onClick}>
			{children}
			{showArrow && <ArrowIcon />}
		</button>
	);
};

export default Button;
