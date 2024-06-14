import { useEffect, useState } from "react";

interface ImageCheckerProps {
	src: string;
	children: JSX.Element;
}

const ImageChecker = (props: ImageCheckerProps) => {
	const [isBroken, setIsBroken] = useState(false);

	useEffect(() => {
		const img = new Image();
		img.onerror = () => setIsBroken(true);
		img.src = props.src;
	}, [props.src]);

	return !isBroken ? props.children : <></>;
};

export default ImageChecker;
