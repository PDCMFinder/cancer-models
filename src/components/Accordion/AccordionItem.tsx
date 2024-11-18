import Button from "../Button/Button";

export type AccordionItemProps = {
	title: string;
	isDefaultOpen?: boolean; // needed for Accordion state
	children: React.ReactNode;
	isOpen?: boolean;
	onToggle?: (title: string) => void; // optional because its only passed from Accordion
};

const AccordionItem = ({
	title,
	children,
	isOpen,
	onToggle
}: AccordionItemProps) => {
	return (
		<div>
			<Button
				priority="secondary"
				color="dark"
				className={`mt-1 mb-0 w-100 text-capitalize border-xs ${
					isOpen ? "bg-white bc-current" : "bg-gray bc-transparent"
				}`}
				onClick={() => {
					onToggle && onToggle(title);
				}}
			>
				{title}
			</Button>
			{isOpen && <div className="px-1">{children}</div>}
		</div>
	);
};

export default AccordionItem;
