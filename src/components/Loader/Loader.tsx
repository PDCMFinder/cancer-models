import { CSSProperties } from "react";
import styles from "./Loader.module.scss";

const Loader = (props: { style?: CSSProperties }) => {
	return (
		<div className={styles.Loader} style={props.style}>
			<span></span>
		</div>
	);
};

export default Loader;
