type Props = {
	className?: string;
	isPill?: boolean;
};

const ModelNotAvailable = ({ className, isPill }: Props) => {
	if (isPill) {
		return (
			<div className={`${className} bg-white br-round text-red py-1 px-2`}>
				<p className="text-small m-0">Model not available</p>
			</div>
		);
	} else {
		return (
			<p className={`${className} text-small m-0`}>
				<i>Model not available</i>
			</p>
		);
	}
};

export default ModelNotAvailable;
