import React, { FC } from "react";
import { BatteryIcon, Container, PercentageText } from "./styles";

export interface BatteryIndicatorProps {
    value: number
}

const BatteryIndicator: FC<BatteryIndicatorProps> = ({ value }) => {
	return (
		<Container>
			<BatteryIcon value={value} />
			<PercentageText>{value * 100}%</PercentageText>
		</Container>
	);
};

export default BatteryIndicator;
