import { ResponsiveWrapper } from "@nivo/core";
import { memo } from "react";
import GeoMapWithMarkers from "./GeoMapWithMarkers";
import { BasicTooltip } from "@nivo/tooltip";
import { MapMarkerTooltip } from "./MapMarkerTooltip";

const MapTooltip = memo(({ feature }: { feature: any }) => {
	if (feature === undefined || feature.providers === undefined) return null;

	return (
		<MapMarkerTooltip
			id={feature.id}
			color={feature.color}
			enableChip={false}
			providers={feature.providers}
		/>
	);
});

const ProviderMapChart = (props: any) => {
	return (
		<ResponsiveWrapper>
			{({ width, height }) => (
				<GeoMapWithMarkers
					width={width}
					height={height}
					tooltip={MapTooltip}
					layers={["features", "markers"]}
					{...props}
				/>
			)}
		</ResponsiveWrapper>
	);
};

export default ProviderMapChart;
