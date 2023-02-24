import styles from "./Modal.module.scss";
import { useEffect } from "react";

interface IModalProps {
	children: string | JSX.Element;
	handleClose: () => void;
}

const Modal = (props: IModalProps) => {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	// Press esc to close
	document.body.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			props.handleClose();
		}
	});

	// Click backdrop to close
	const handleBackdropClick = () => {
		props.handleClose();
	};

	return (
		<div className={`${styles.Modal} h-100 position-absolute top-0 w-100`}>
			<div
				className={`${styles.Modal_backdrop} h-100 w-100 top-0 position-fixed`}
				onClick={handleBackdropClick}
			></div>
			<div className={`${styles.Modal_content} position-fixed`}>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
