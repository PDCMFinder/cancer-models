import { ITabProps } from "../../../globalTypes";

const Tab = (props: ITabProps["props"]) => {
	return <div>{props.content}</div>;
};

export default Tab;
