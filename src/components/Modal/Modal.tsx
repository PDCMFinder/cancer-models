import styles from "./Modal.module.scss";
import { CSSProperties, useEffect } from "react";

interface IModalProps {
	children: string | JSX.Element;
	modalWidth?: "100" | "50" | "auto";
	verticalAlign?: "center" | "top";
	className?: string;
	handleClose: () => void;
	style?: CSSProperties;
}

const Modal = ({
	children,
	modalWidth = "auto",
	verticalAlign = "center",
	className,
	handleClose,
	style,
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
			<div
				className={`${styles.Modal} ${styles[`Modal-${verticalAlign}`]} ${
					className ?? ""
				} position-fixed w-${modalWidth}`}
				style={style}
			>
				<div className={`position-relative ${styles.Modal_content}`}>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
