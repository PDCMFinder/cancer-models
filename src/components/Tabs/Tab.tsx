import { TabProps } from "../../../types/globalTypes";

const Tab = (props: TabProps["props"]) => {
	return <div>{props.content}</div>;
};

export default Tab;
