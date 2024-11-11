import React, { useEffect, useState } from "react";
import AccordionItem, { AccordionItemProps } from "./AccordionItem";

// really doesn't do anything, but we'll have it here for reference
type AccordionChildren = React.ReactElement<AccordionItemProps>;

export type AccordionProps = {
	allowMultipleOpen?: boolean;
	children: AccordionChildren | AccordionChildren[];
	className?: string;
};

const Accordion = ({
	allowMultipleOpen,
	children,
	className
}: AccordionProps) => {
	const [openItems, setOpenItems] = useState<string[]>([]);

	useEffect(() => {
		// all of this so we don't have to use context just for one component ( overkill )
		const defaultOpenItems = React.Children.toArray(children)
			.filter(
				(child): child is React.ReactElement<AccordionItemProps> =>
					React.isValidElement(child) &&
					child.type === AccordionItem &&
					child.props.isDefaultOpen
			)
			.map((child) => child.props.title);

		setOpenItems(defaultOpenItems);
	}, [children]);

	const toggleItem = (title: string) => {
		if (allowMultipleOpen) {
			setOpenItems((prev) =>
				prev.includes(title)
					? prev.filter((item) => item !== title)
					: [...prev, title]
			);
		} else {
			setOpenItems((prev) => (prev.includes(title) ? [] : [title]));
		}
		console.log(openItems);
	};

	return (
		<div className={className}>
			{/* all of this so we don't have to use context just for one component ( overkill ) */}
			{React.Children.map(children, (child) => {
				if (
					React.isValidElement<AccordionItemProps>(child) &&
					child.type === AccordionItem
				) {
					return React.cloneElement(child, {
						key: child.props.title,
						isOpen: openItems.includes(child.props.title),
						onToggle: toggleItem
					});
				}

				return child;
			})}
		</div>
	);
};

export default Accordion;
