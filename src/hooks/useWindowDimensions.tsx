const RESIZE = "resize";

import { useState, useEffect } from "react";

interface IwindowDimensions {
	windowWidth: number | undefined;
	windowHeight: number | undefined;
}

const getWindowDimensions = (): IwindowDimensions => {
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

const useWindowDimensions = (): IwindowDimensions => {
	const [windowDimensions, setWindowDimensions] = useState<IwindowDimensions>({
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
