import { memo, ReactNode } from "react";
import { useTheme, ValueFormat, useValueFormatter } from "@nivo/core";

export interface BasicTooltipProps {
	id: ReactNode;
	providers: Array<any>;
	format?: ValueFormat<number | string | Date>;
	color?: string;
	enableChip?: boolean;
	/**
	 * @deprecated This should be replaced by custom tooltip components.
	 */
	renderContent?: () => JSX.Element;
}

export const MapMarkerTooltip = memo<BasicTooltipProps>(
	({ id, providers, format, enableChip = false, color, renderContent }) => {
		const theme = useTheme();
		const formatValue = useValueFormatter<number | string | Date>(format);

		return (
			<div style={theme.tooltip.container}>
				{" "}
				<div
					style={{
						//whiteSpace: "pre",
						display: "flex",
						alignItems: "flex-start",
						flexDirection: "column",
						maxWidth: "400px",
					}}
				>
					<p>
						<strong>{id}</strong>
					</p>
					{providers.map((p) => (
						<p key={p.name}>
							{p.name}: <strong>{`${p.count}`}</strong>
						</p>
					))}
				</div>
			</div>
		);
	}
);

MapMarkerTooltip.displayName = "MapMarkerTooltip";

export default MapMarkerTooltip;
