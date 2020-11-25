import React from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import BatteryIndicator from "./BatteryIndicator";
import { BottomContent, Container, Content, Heading, LastMessage, LastMessageDateTime, Marks, ProfilePicture, TopContent } from "./styles";

export interface SessionButtonProps {
    heading: string
    imageUrl?: string
    lastMessage?: string
    lastMessageDateTime?: Date
    color?: string
    batteryPercentage?: number
    token: string
}

// const formatDateTime = (date: Date) => {
//     return `${date.getHours()}:${date.getMinutes()}`;
// }

const SessionButton: FC<SessionButtonProps> = ({token, color, imageUrl, heading, lastMessage, lastMessageDateTime, batteryPercentage}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/waclients/${token}/chats`);
    }

    return (
        <Container color={color} onClick={handleClick} >
            {imageUrl && (
                <ProfilePicture src={imageUrl} />
            )}
            <Content>
                <TopContent>

                    <Heading title={heading}>{heading}</Heading>
                    <Marks>
                        {!!batteryPercentage && (
                            <BatteryIndicator value={batteryPercentage} />
                        )}
                    </Marks>
                </TopContent>
                <BottomContent>
                    <LastMessage>{lastMessage}</LastMessage>
                    <Marks>
                    </Marks>
                </BottomContent>
            </Content>
        </Container>
    )
}

export default SessionButton;