import styles from "./Modal.module.scss";

interface IModalProps {
	children: string | JSX.Element;
	handleClose: () => void;
}

const Modal = (props: IModalProps) => {
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
				className={`${styles.Modal_backdrop} h-100 w-100 top-0`}
				onClick={handleBackdropClick}
			></div>
			<div className={`${styles.Modal_content} position-fixed`}>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
