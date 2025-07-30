import { CSSProperties, useEffect } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
	children: JSX.Element;
	modalWidth?: "90" | "50" | "auto";
	verticalAlign?: "center" | "top";
	className?: string;
	handleClose?: () => void;
	style?: CSSProperties;
	strictClose?: boolean;
	backdropOpacity?: number;
};

const Modal = ({
	children,
	modalWidth = "90",
	verticalAlign = "center",
	className,
	handleClose,
	style,
	strictClose,
	backdropOpacity = 0.75
}: ModalProps) => {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		if (!strictClose) {
			// Press esc to close
			document.body.addEventListener("keydown", (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					handleClose && handleClose();
				}
			});
		}
		return () => {
			if (!strictClose) {
				document.body.removeEventListener("keydown", (e: KeyboardEvent) => {
					if (e.key === "Escape") {
						handleClose && handleClose();
					}
				});
			}

			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return (
		<>
			<div
				style={{
					backgroundColor: `rgba(0, 0, 0, ${backdropOpacity.toString()})`
				}}
				className={`${styles.Modal_backdrop} h-100 w-100 top-0 position-fixed`}
				onClick={!strictClose ? handleClose : undefined}
			></div>
			<div
				className={`${styles.Modal} ${
					verticalAlign === "center" && styles[`Modal-center`]
				} ${className ?? ""} position-fixed w-${modalWidth}`}
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
