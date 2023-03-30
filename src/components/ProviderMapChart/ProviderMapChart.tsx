import { ResponsiveWrapper } from "@nivo/core";
import { memo } from "react";
import GeoMapWithMarkers from "./GeoMapWithMarkers";
import { BasicTooltip } from "@nivo/tooltip";
import { MapMarkerTooltip } from "./MapMarkerTooltip";
import MapTooltip from "./MapToolTip";

const ProviderMapChart: React.FC = (props: any) => (
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

ProviderMapChart.displayName = "ProviderMapChart";
export default ProviderMapChart;
