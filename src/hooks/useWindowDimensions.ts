const RESIZE = "resize";

import { useEffect, useState } from "react";

type WindowDimensions = {
	windowWidth: number | undefined;
	windowHeight: number | undefined;
};

const getWindowDimensions = (): WindowDimensions => {
	let windowWidth, windowHeight;

	if (typeof window !== "undefined") {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	}

	return {
		windowWidth,
		windowHeight
	};
};

const useWindowDimensions = (): WindowDimensions => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
		windowWidth: undefined,
		windowHeight: undefined
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
