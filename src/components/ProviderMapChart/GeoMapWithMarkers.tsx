//@ts-ignore
import { GeoMap, useGeoMap } from "@nivo/geo";
import { useTooltip } from "@nivo/tooltip";
import { useCallback } from "react";
import Features from "../../../public/img/world_countries.json";

const GeoMapWithMarkers = (props: any) => {
	console.log(props);

	const {
		width,
		height,
		margin: partialMargin,
		features,
		layers,
		projectionType,
		projectionScale,
		projectionTranslation,
		projectionRotation,
		fillColor,
		borderWidth,
		borderColor,
		enableGraticule,
		graticuleLineWidth,
		graticuleLineColor,
		isInteractive,
		onClick,
		tooltip: Tooltip,
		role,
		data,
	} = props;
	const { projection } = useGeoMap({
		width,
		height,
		projectionType: "mercator",
		projectionScale,
		projectionTranslation,
		projectionRotation,
		fillColor,
		borderWidth,
		borderColor,
	});
	const { showTooltipFromEvent, hideTooltip } = useTooltip();
	const handleClick = useCallback(
		(feature: any, event: any) =>
			isInteractive && onClick && onClick(feature, event),
		[isInteractive, onClick]
	);
	const handleMouseEnter = useCallback(
		(datum: any, event: any) => {
			console.log(datum);
			return (
				isInteractive &&
				Tooltip &&
				showTooltipFromEvent(<Tooltip datum={datum} />, event)
			);
		},
		[isInteractive, showTooltipFromEvent, Tooltip]
	);
	const handleMouseMove = useCallback(
		(datum: any, event: any) =>
			isInteractive &&
			Tooltip &&
			showTooltipFromEvent(<Tooltip datum={datum} />, event),
		[isInteractive, showTooltipFromEvent, Tooltip]
	);
	const handleMouseLeave = useCallback(
		() => isInteractive && hideTooltip(),
		[isInteractive, hideTooltip]
	);

	return (
		<GeoMap
			{...props}
			layers={
				[
					"features",
					(props: any) => {
						return (
							<g>
								{data.map((d: any) => {
									const [x, y] = projection([d.lat, d.long]);
									return (
										<circle
											cx={x}
											cy={y}
											r={5}
											stroke="#000"
											strokeWidth={1}
											fill="#fff"
											key={`${d.lat}_${d.long}`}
											onMouseEnter={(e) => {
												handleMouseEnter(d, e);
											}}
											onMouseMove={(e) => {
												handleMouseMove(d, e);
											}}
											onMouseLeave={(e) => {
												handleMouseLeave();
											}}
											onClick={(e) => {
												handleClick(d, e);
											}}
										/>
									);
								})}
							</g>
						);
					},
				] as any
			}
		/>
	);
};

export default GeoMapWithMarkers;
