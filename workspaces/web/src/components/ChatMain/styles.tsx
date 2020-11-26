import styled from "styled-components";
import { Container as MainContainer } from "../Main/styles";

export const Container = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    padding: 0 .4em;
`;

export interface MessageProps {
    isMe?: boolean;
}

export const Message = styled.div<MessageProps>`
    /* grid-area: ${props => props.isMe ? "me" : "sender"}; */
    align-self: ${({ isMe }) => isMe ? "flex-end" : "flex-start"};
    background-color: #537b96;
    border-radius: 3px;
    margin-bottom: 1em;
    padding: .5em 1em;
    max-width: 60%;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

Message.defaultProps = {
	isMe: true
};

export const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
`;
