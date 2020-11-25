import React from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { SessionData } from "@common/whatsapp/sessions";
import BatteryIndicator from "./BatteryIndicator";
import { BottomContent, Container, Content, Heading, LastMessage, Marks, ProfilePicture, TopContent } from "./styles";

export interface SessionButtonProps {
    sessionData: SessionData,
    onClick: () => void
}


const SessionButton: FC<SessionButtonProps> = ({sessionData: {chats, name, id, profilePicUrl, batteryPercentage}, onClick}) => {

    const history = useHistory();



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
    )
}

export default SessionButton;