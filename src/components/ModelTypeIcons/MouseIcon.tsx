const MouseIcon = ({ color, size }: { color?: string; size: string }) => {
	const splitSize = size.split(/(?=\d)|(?<=\d)/),
		sizeAmount = Number(splitSize[0]),
		sizeUnit = splitSize[1];

	return (
		<svg
			className="d-inline"
			style={{ height: size ?? "1em" }}
			viewBox="0 0 159 148"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M79.978 147.47C79.8027 147.47 79.6263 147.449 79.4544 147.406C69.7699 145.045 63.7232 138.994 61.482 129.42C61.2662 128.496 61.6628 127.537 62.469 127.036C68.2953 123.419 74.1823 121.568 79.966 121.535C85.775 121.568 91.6616 123.419 97.4868 127.036C98.293 127.537 98.6896 128.496 98.4738 129.42C96.2315 138.993 90.1859 145.045 80.5015 147.406C80.3306 147.449 80.1542 147.47 79.9778 147.47H79.978ZM66.2022 129.965C68.255 136.808 72.7778 141.076 79.978 142.978C87.1781 141.076 91.6999 136.808 93.7526 129.965C89.1004 127.332 84.4681 125.985 79.9648 125.958C75.4845 125.985 70.8555 127.332 66.2022 129.965V129.965Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M95.4309 134.148C94.9741 134.148 94.5173 134.008 94.1285 133.724C93.3343 133.146 93.0166 132.112 93.3496 131.187C93.4931 130.789 93.6279 130.381 93.7527 129.964C89.0994 127.331 84.4682 125.984 79.966 125.958C75.4857 125.984 70.8567 127.331 66.2034 129.964C66.3283 130.38 66.463 130.788 66.6065 131.187C66.9395 132.112 66.6229 133.146 65.8277 133.724C65.0324 134.304 63.9524 134.287 63.1735 133.687C44.7531 119.46 30.4678 82.5152 30.4678 60.2244C30.4678 34.9874 49.9025 18.6797 79.9793 18.6797C110.058 18.6808 129.491 34.9869 129.491 60.2244C129.491 82.5147 115.205 119.461 96.7851 133.687C96.3874 133.994 95.9109 134.147 95.4333 134.147L95.4309 134.148ZM79.979 23.1032C52.5884 23.1032 34.8897 37.6754 34.8897 60.2257C34.8897 80.0524 46.6325 111.95 62.346 127.121C62.3854 127.093 62.4259 127.065 62.4687 127.038C68.295 123.422 74.1819 121.57 79.9657 121.537C85.7735 121.57 91.6602 123.421 97.4865 127.038C97.5292 127.065 97.5698 127.092 97.6092 127.121C113.323 111.948 125.065 80.0516 125.065 60.2257C125.065 37.6768 107.367 23.1032 79.9762 23.1032H79.979Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M33.482 72.2366C33.4032 72.2366 33.3232 72.2322 33.2422 72.2234C15.1243 70.2747 1.45898 55.0629 1.45898 36.8396C1.45898 17.2176 17.4235 1.25391 37.0447 1.25391C50.6923 1.25391 62.9213 8.85702 68.9597 21.0961C69.4997 22.1915 69.0495 23.5169 67.9541 24.0579C66.862 24.6002 65.5333 24.1477 64.9923 23.0524C59.7049 12.3337 48.9961 5.67593 37.0453 5.67593C19.8618 5.67593 5.88185 19.6564 5.88185 36.8394C5.88185 52.7971 17.8481 66.1184 33.7161 67.8261C34.9298 67.9565 35.8083 69.0464 35.678 70.2612C35.5564 71.395 34.5968 72.2362 33.4817 72.2362L33.482 72.2366Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M126.474 72.2362C125.358 72.2362 124.399 71.395 124.278 70.2612C124.147 69.0464 125.026 67.9565 126.24 67.8261C142.108 66.1206 154.074 52.8005 154.074 36.8394C154.074 19.6559 140.093 5.67593 122.91 5.67593C110.96 5.67593 100.251 12.3337 94.9634 23.0524C94.4234 24.1477 93.0946 24.5991 92.0016 24.0579C90.9062 23.5168 90.456 22.1914 90.996 21.0961C97.036 8.85618 109.264 1.25391 122.911 1.25391C142.533 1.25391 158.497 17.2173 158.497 36.8396C158.497 55.0638 144.832 70.2745 126.714 72.2234C126.632 72.2333 126.554 72.2377 126.475 72.2377L126.474 72.2362Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M61.8085 79.1148C57.0194 79.1148 53.124 74.1033 53.124 67.9427C53.124 61.781 57.0194 56.7695 61.8085 56.7695C66.5975 56.7695 70.4929 61.781 70.4929 67.9427C70.4918 74.1033 66.5964 79.1148 61.8085 79.1148V79.1148ZM61.8085 61.1918C59.5388 61.1918 57.5474 64.3466 57.5474 67.9427C57.5474 71.5377 59.5389 74.6925 61.8085 74.6925C64.078 74.6925 66.0695 71.5377 66.0695 67.9427C66.0695 64.3466 64.078 61.1918 61.8085 61.1918Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M98.1501 79.1148C93.3622 79.1148 89.4668 74.1033 89.4668 67.9427C89.4668 61.781 93.3622 56.7695 98.1501 56.7695C102.939 56.7695 106.835 61.781 106.835 67.9427C106.835 74.1033 102.939 79.1148 98.1501 79.1148V79.1148ZM98.1501 61.1918C95.8804 61.1918 93.8902 64.3466 93.8902 67.9427C93.8902 71.5377 95.8806 74.6925 98.1501 74.6925C100.42 74.6925 102.411 71.5377 102.411 67.9427C102.411 64.3466 100.42 61.1918 98.1501 61.1918Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M44.1332 131.392C43.4979 131.392 42.8669 131.12 42.4298 130.593C41.6499 129.652 41.7814 128.258 42.7212 127.479L60.147 113.04C61.088 112.26 62.4802 112.392 63.2611 113.332C64.0399 114.273 63.9096 115.666 62.9697 116.446L45.5439 130.884C45.1299 131.227 44.6304 131.392 44.1331 131.392H44.1332Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M27.6983 114.464C26.6719 114.464 25.7528 113.745 25.536 112.7C25.2873 111.504 26.0563 110.334 27.2525 110.085L53.6397 104.61C54.8282 104.36 56.0058 105.128 56.2545 106.326C56.5031 107.522 55.7341 108.692 54.538 108.941L28.1507 114.417C27.9984 114.448 27.8473 114.464 27.6983 114.464V114.464Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M115.826 131.393C115.328 131.393 114.829 131.227 114.416 130.885L96.9901 116.446C96.0492 115.667 95.9188 114.273 96.6988 113.332C97.4776 112.391 98.8709 112.26 99.8129 113.041L117.239 127.479C118.18 128.259 118.31 129.653 117.53 130.594C117.092 131.122 116.461 131.393 115.826 131.393H115.826Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
			<path
				d="M132.259 114.467C132.11 114.467 131.959 114.452 131.808 114.42L105.42 108.944C104.224 108.695 103.455 107.526 103.704 106.329C103.954 105.132 105.131 104.365 106.319 104.613L132.706 110.089C133.902 110.337 134.671 111.507 134.422 112.703C134.204 113.748 133.285 114.467 132.259 114.467V114.467Z"
				fill={color ?? "currentColor"}
				stroke={color ?? "currentColor"}
			/>
		</svg>
	);
};

export default MouseIcon;
