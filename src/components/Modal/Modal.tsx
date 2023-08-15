import styles from "./Modal.module.scss";
import { useEffect } from "react";

interface IModalProps {
	children: string | JSX.Element;
	verticalAlign?: "center" | "top";
	handleClose: () => void;
}

const Modal = ({
	children,
	verticalAlign = "center",
	handleClose,
}: IModalProps) => {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		// Press esc to close
		document.body.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleClose();
			}
		});
		return () => {
			document.body.removeEventListener("keydown", (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					handleClose();
				}
			});
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return (
		<>
			<div
				className={`${styles.Modal_backdrop} h-100 w-100 top-0 position-fixed`}
				onClick={handleClose}
			></div>
			<div className={`${styles.Modal}  position-fixed top-0 w-100`}>
				<div
					className={`position-relative ${
						styles[`Modal_content-${verticalAlign}`]
					} ${styles.Modal_content}`}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
