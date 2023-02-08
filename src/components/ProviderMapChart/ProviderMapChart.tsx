import { ResponsiveWrapper } from "@nivo/core";
import { memo } from "react";
import GeoMapWithMarkers from "./GeoMapWithMarkers";
import { BasicTooltip } from "@nivo/tooltip";

// const MapTooltip = memo(({ datum }: { datum: any }) => {
// 	if (datum === undefined || datum.data === undefined) return null;
// 	console.log(datum);

// 	return (
// 		<BasicTooltip
// 			id={datum.label}
// 			color={datum.color}
// 			enableChip={true}
// 			value={datum.formattedValue}
// 		/>
// 	);
// });

const ProviderMapChart = (props: any) => {
	return (
		<ResponsiveWrapper>
			{({ width, height }) => (
				<GeoMapWithMarkers
					data={[
						{
							id: "ARG",
							value: 396026,
						},
					]}
					width={width}
					height={height}
					{...props}
				/>
			)}
		</ResponsiveWrapper>
	);
};

export default ProviderMapChart;
