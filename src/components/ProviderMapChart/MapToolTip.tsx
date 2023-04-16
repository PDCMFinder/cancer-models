import { memo } from "react";
import MapMarkerTooltip from "./MapMarkerTooltip";

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

MapTooltip.displayName = "MapTooltip";

export default MapTooltip;
