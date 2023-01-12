const RESIZE = "resize";

import { useState, useEffect } from "react";

interface IWindowDimensions {
	windowWidth: number | undefined;
	windowHeight: number | undefined;
}

const getWindowDimensions = (): IWindowDimensions => {
	let windowWidth, windowHeight;

	if (typeof window !== "undefined") {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	}

	return {
		windowWidth,
		windowHeight,
	};
};

const useWindowDimensions = (): IWindowDimensions => {
	const [windowDimensions, setWindowDimensions] = useState<IWindowDimensions>({
		windowWidth: undefined,
		windowHeight: undefined,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions(getWindowDimensions());
		};

		handleResize();

		window.addEventListener(RESIZE, handleResize);

		return () => window.removeEventListener(RESIZE, handleResize);
	}, []);

	return windowDimensions;
};

export default useWindowDimensions;
