import React, { useEffect, useState } from "react";
// @ts-ignore
import { TIFFViewer } from "react-tiff";

interface IImageConverter {
	imgUrl: string;
}

const ImageConverter = ({ imgUrl }: IImageConverter) => {
	const [convertedImageUrl, setConvertedImageUrl] = useState<string>("");

	const fetchAndConvertImage = async () => {
		try {
			const response = await fetch(imgUrl);
			const blob = await response.blob();

			const reader = new FileReader();
			reader.onload = () => {
				const base64data = reader.result?.toString()?.split(",")[1]; // Extract base64 data
				setConvertedImageUrl(base64data || "");
			};

			reader.readAsDataURL(blob);
		} catch (error) {
			console.error("Error fetching or converting image:", error);
		}
	};

	useEffect(() => {
		fetchAndConvertImage();
	}, []);

	return (
		<div>
			{convertedImageUrl && (
				<TIFFViewer tiff={`data:image/tiff;base64,${convertedImageUrl}`} />
			)}
		</div>
	);
};

export default ImageConverter;
