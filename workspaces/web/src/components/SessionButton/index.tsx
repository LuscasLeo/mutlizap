import { SessionData } from "@common/whatsapp/sessions";
import React, { FC } from "react";
import BatteryIndicator from "./BatteryIndicator";
import { BottomContent, Container, Content, Heading, LastMessage, Marks, ProfilePicture, TopContent } from "./styles";
export interface SessionButtonProps {
    sessionData: SessionData,
    onClick: () => void
}

const SessionButton: FC<SessionButtonProps> = ({ sessionData: { name, profilePicUrl, batteryPercentage }, onClick }) => {

	return (
		<Container color="white" onClick={onClick} >
			{profilePicUrl && (
				<ProfilePicture src={profilePicUrl} />
			)}
			<Content>
				<TopContent>

					<Heading>{name}</Heading>
					<Marks>
						{!!batteryPercentage && (
							<BatteryIndicator value={batteryPercentage} />
						)}
					</Marks>
				</TopContent>
				<BottomContent>
					<LastMessage>Abrir</LastMessage>
					<Marks>
					</Marks>
				</BottomContent>
			</Content>
		</Container>
	);
};

export default SessionButton;
