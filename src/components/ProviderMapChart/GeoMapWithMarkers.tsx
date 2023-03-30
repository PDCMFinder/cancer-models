//@ts-nocheck
import { Fragment, useCallback, memo } from "react";
import { SvgWrapper, withContainer, useDimensions, useTheme } from "@nivo/core";
import { useTooltip } from "@nivo/tooltip";
import {
	GeoGraticule,
	GeoMapPropTypes,
	GeoMapDefaultProps,
	useGeoMap,
} from "@nivo/geo";

import GeoMapFeature from "./GeoMapFeature";

const GeoMapWithMarkers = memo((props) => {
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
	}: any = props;
	const { margin, outerWidth, outerHeight } = useDimensions(
		width,
		height,
		partialMargin
	);
	const {
		projection,
		graticule,
		path,
		getFillColor,
		getBorderWidth,
		getBorderColor,
	} = useGeoMap({
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

	const theme = useTheme();

	const { showTooltipFromEvent, hideTooltip } = useTooltip();
	const handleClick = useCallback(
		(feature: any, event: any) =>
			isInteractive && onClick && onClick(feature, event),
		[isInteractive, onClick]
	);
	const handleMouseEnter = useCallback(
		(feature: any, event: any) =>
			isInteractive &&
			Tooltip &&
			showTooltipFromEvent(<Tooltip feature={feature} />, event),
		[isInteractive, showTooltipFromEvent, Tooltip]
	);
	const handleMouseMove = useCallback(
		(feature: any, event: any) =>
			isInteractive &&
			Tooltip &&
			showTooltipFromEvent(<Tooltip feature={feature} />, event),
		[isInteractive, showTooltipFromEvent, Tooltip]
	);
	const handleMouseLeave = useCallback(
		() => isInteractive && hideTooltip(),
		[isInteractive, hideTooltip]
	);

	return (
		<SvgWrapper
			width={outerWidth}
			height={outerHeight}
			margin={margin}
			theme={theme}
			role={role}
		>
			{layers.map((layer, i) => {
				if (layer === "graticule") {
					if (enableGraticule !== true) return null;

					return (
						<GeoGraticule
							key="graticule"
							path={path}
							graticule={graticule}
							lineWidth={graticuleLineWidth}
							lineColor={graticuleLineColor}
						/>
					);
				}
				if (layer === "features") {
					return (
						<Fragment key="features">
							{features.map((feature) => (
								<GeoMapFeature
									key={feature.id}
									feature={feature}
									path={path}
									fillColor={getFillColor(feature)}
									borderWidth={getBorderWidth(feature)}
									borderColor={getBorderColor(feature)}
									onMouseEnter={handleMouseEnter}
									onMouseMove={handleMouseMove}
									onMouseLeave={handleMouseLeave}
									onClick={handleClick}
								/>
							))}
						</Fragment>
					);
				}
				if (layer === "markers") {
					return (
						<Fragment key="markers">
							{data.map((d) => {
								const [x, y] = projection([d.lat, d.long]);
								return (
									<circle
										cx={x}
										cy={y}
										r={5}
										stroke="#000"
										strokeWidth={1}
										fill="#fff"
										key={d.id}
										onMouseEnter={(e) => {
											handleMouseEnter(d, e);
										}}
										onMouseMove={(e) => {
											//	handleMouseMove(d, e);
										}}
										onMouseLeave={(e) => {
											//	handleMouseLeave();
										}}
										onClick={(e) => {
											handleClick(d, e);
										}}
									/>
								);
							})}
						</Fragment>
					);
				}

				return <Fragment key={i}>{layer(props)}</Fragment>;
			})}
		</SvgWrapper>
	);
});

GeoMapWithMarkers.displayName = "GeoMapWithMarkers";
GeoMapWithMarkers.propTypes = GeoMapPropTypes;
GeoMapWithMarkers.defaultProps = GeoMapDefaultProps;

export default withContainer(GeoMapWithMarkers);
