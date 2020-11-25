import React from "react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { BottomContent, Container, Content, Heading, LastMessage, LastMessageDateTime, Marks, ProfilePicture, TopContent } from "./styles";


export interface ChatButtonProps {
    token: string,
    chatId: string,
    heading: string,
    color?: string,
    lastMessageDateTime?: string,
    profilePic?: string
}

const ChatButton: FC<ChatButtonProps> = ({token, chatId, heading, color, lastMessageDateTime, profilePic}) => {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/waclients/${token}/chats/${chatId}`);
    }

    return (
        <Container color={color || '#eee'} onClick={() => handleClick()}>
            <ProfilePicture src={profilePic} />
            <Content>
                <TopContent>
                    <Heading>{heading}</Heading>
                    <LastMessageDateTime>{lastMessageDateTime}</LastMessageDateTime>
                </TopContent>
                <BottomContent>
                    abrir chat
                </BottomContent>
            </Content>
        </Container>
    )
}

export default ChatButton;