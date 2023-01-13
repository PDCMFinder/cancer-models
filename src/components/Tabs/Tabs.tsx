import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Tabs.module.scss";
import { ITabProps } from "../../../globalTypes";
import Tab from "./Tab";

interface ITabsProps {
	children: ITabProps[]; // change this
	className?: string;
	labelClassName?: string;
	contentClassName?: string;
	packedLabels?: boolean;
}

const Tabs = (props: ITabsProps) => {
	const [shownContent, setShownContent] = useState<
		ITabProps["props"] | undefined
	>(props.children[0].props);

	const handleTabChange = (label: string) => {
		let openTab = props.children.find((tab) => tab.props.label === label);

		setShownContent(openTab?.props as ITabProps["props"]);
	};

	return (
		<div className={styles.Tabs}>
			<div className="row">
				<div
					className={`col-12 ${
						!props.packedLabels ? "justify-content-between d-flex" : ""
					}`.trim()}
				>
					{props.children.map((tab) => (
						<Button
							key={tab.props.label}
							color="dark"
							priority="secondary"
							// TODO set active class if this content is showing
							// TODO handle arrows
							className={`text-capitalize text-family-primary text-bold link-text m-0 ${
								props.labelClassName ? props.labelClassName : ""
							}`.trim()}
							aria-controls={tab.props.label}
							// arrow
							// arrowDirection={isOpen ? "down" : "right"}
							onClick={() => handleTabChange(tab.props.label)}
						>
							{tab.props.label}
						</Button>
					))}
				</div>
			</div>
			<div className="row flex-nowrap">{shownContent?.content}</div>
		</div>
	);
};

export default Tabs;
