const isExternalLink = (url: string): boolean => {
	try {
		const linkURL = new URL(url, window.location.href);

		return linkURL.origin !== window.location.origin;
	} catch {
		return false;
	}
};

export default isExternalLink;
