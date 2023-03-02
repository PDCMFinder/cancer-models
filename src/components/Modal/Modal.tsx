import styles from "./Modal.module.scss";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	// Press esc to close
	document.body.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			handleClose();
		}
	});

	// Click backdrop to close
	const handleBackdropClick = () => {
		handleClose();
	};

	return (
		<>
			<div
				className={`${styles.Modal_backdrop} h-100 w-100 top-0 position-fixed`}
				onClick={handleBackdropClick}
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
