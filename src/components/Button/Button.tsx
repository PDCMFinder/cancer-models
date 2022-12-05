import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: string;
  priority: "primary" | "secondary";
  color: "dark" | "light" | "white";
  htmlTag?: "a" | "button";
  href?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  let href = props.href,
    children = props.children,
    LinkTag: typeof Link | string = Link,
    classNames = `
      ${styles.Button}
      ${styles[`Button--${props.priority}`]}
      ${styles[`Button--${props.color}`]}
    `,
    externalLinkProps;

  if (props.htmlTag === "a" && href) {
    if (href.includes("https://") || href.includes("http://")) {
      LinkTag = "a";
      externalLinkProps = {
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }

    // NextJS doesn't run in Storybook, so Link doesn't work
    if (process.env.STORYBOOK === "true") {
      LinkTag = "a";
    }

    return (
      <LinkTag className={classNames} href={href} {...externalLinkProps}>
        {children}
      </LinkTag>
    );
  }

  return (
    <button className={classNames} onClick={props.onClick}>
      {children}
    </button>
  );
};

export default Button;
