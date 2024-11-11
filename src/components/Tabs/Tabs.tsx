import { useState } from "react";
import { TabProps } from "../../../types/globalTypes";
import Button from "../Button/Button";
import styles from "./Tabs.module.scss";

type TabsProps = {
	children: TabProps[];
	className?: string;
	labelClassName?: string;
	contentClassName?: string;
	packedLabels?: boolean;
};

const Tabs = (props: TabsProps) => {
	const [shownContent, setShownContent] = useState<
		TabProps["props"] | undefined
	>(props.children[0].props);

	const handleTabChange = (label: string) => {
		let openTab = props.children.find((tab) => tab.props.label === label);

		setShownContent(openTab?.props as TabProps["props"]);
	};

	let packedLabels = props.packedLabels;

	return (
		<>
			<div className="row">
				<div
					className={`col-12 ${
						!packedLabels ? "justify-content-between d-flex" : ""
					}`.trim()}
				>
					{props.children.map((tab) => {
						let label = tab.props.label,
							labelClassName = props.labelClassName ? props.labelClassName : "",
							packedLabelsClassName = packedLabels ? "mr-1" : "",
							isActiveTabClassName =
								shownContent?.label === label
									? "Tabs_tabButton-active"
									: "Tabs_tabButton";

						return (
							<Button
								key={label}
								color="dark"
								priority="secondary"
								className={`text-capitalize text-family-primary text-bold my-0 ${styles[isActiveTabClassName]} ${packedLabelsClassName} ${labelClassName}`.trim()}
								aria-controls={label}
								onClick={() => handleTabChange(label)}
							>
								{label}
							</Button>
						);
					})}
				</div>
			</div>
			<div className="row flex-nowrap" style={{ height: "85%" }}>
				{shownContent?.content}
			</div>
		</>
	);
};

export default Tabs;
