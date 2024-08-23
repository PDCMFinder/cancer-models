const checkImages = (url: string): Promise<boolean> => {
	return new Promise((resolve) => {
		// Check if running on the client side
		if (typeof window === "undefined") {
			// Resolve false if on the server since we cannot check the image
			resolve(false);
			return;
		}

		const img = new window.Image();
		img.onload = () => resolve(false); // Image loaded successfully
		img.onerror = () => resolve(true); // Error loading image
		img.src = url;
	});
};

const imageIsBrokenChecker = async <T extends { url: string }>(
	images: T[]
): Promise<T[]> => {
	try {
		// map to an array of promises and resolve
		const checkedImages = await Promise.all(
			images.map(async (image: T) => {
				const isBroken = await checkImages(image.url);

				return { ...image, isBroken };
			})
		);

		// only return non-broken images
		return checkedImages.filter((image) => !image.isBroken);
	} catch (error) {
		console.error("Error checking images:", error);

		// return unmodified images
		return images;
	}
};

export default imageIsBrokenChecker;
