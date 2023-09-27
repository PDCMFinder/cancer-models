import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, useState, useEffect } from "react";

type ActiveLinkProps = LinkProps & {
	className?: string;
	activeClassName: string;
};

const ActiveLink = ({
	children,
	activeClassName,
	className,
	...props
}: PropsWithChildren<ActiveLinkProps>) => {
	const { asPath, isReady } = useRouter();
	const [computedClassName, setComputedClassName] =
		useState<string | undefined>(className);
	const [isActive, setIsActive] = useState<boolean>(false);
	const externalLinkProps = props.href.toString().includes("http")
		? {
				target: "_blank",
				rel: "noopener noreferrer",
		  }
		: null;

	useEffect(() => {
		// Check if the router fields are updated client-side
		if (isReady) {
			// Dynamic route will be matched via props.as
			// Static route will be matched via props.href
			const linkPathname = new URL(
				(props.as || props.href) as string,
				location.href
			).pathname;

			// Using URL().pathname to get rid of query and hash
			const activePathname = new URL(asPath, location.href).pathname;

			setIsActive(linkPathname === activePathname);

			const newClassName =
				linkPathname === activePathname
					? `${className} text-bold ${activeClassName}`.trim()
					: className;

			if (newClassName !== computedClassName) {
				setComputedClassName(newClassName);
			}
		}
	}, [
		asPath,
		isReady,
		props.as,
		props.href,
		activeClassName,
		className,
		computedClassName,
	]);

	return (
		<Link
			className={computedClassName}
			{...props}
			{...externalLinkProps}
			data-test={isActive ? "activeLink-active" : undefined}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
