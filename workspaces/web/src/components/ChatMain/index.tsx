import { SessionData } from "@common/whatsapp/sessions";
import { SessionChat } from "@common/whatsapp/sessions/chats";
import { MessageType, SessionChatMessage } from "@common/whatsapp/sessions/chats/messages";
import React, { FC, useEffect, useRef, useState } from "react";
import { useMultizap } from "../../contexts/MultiSessionContext";
import Button from "../Button";
import InputFooter from "../InputFooter";
import { Container, Message, MessageContainer } from "./styles";

export interface ChatMainProps {
    chat: SessionChat
    sessionData: SessionData
    messages: SessionChatMessage[]
    loadEarlierMessages: () => Promise<void>
}

const ChatMain: FC<ChatMainProps> = ({ sessionData, chat, messages, loadEarlierMessages }) => {
	const containerRef = useRef<HTMLElement>(null);

	const [loadingEarlier, setLoadingEarlier] = useState(false);
	const [lastScrollTop, setLastScrollTop] = useState(0);
	const [lastScrollHeight, setLastScrollHeight] = useState(0);
	const [lastOffsetHeight, setLastOffsetHeight] = useState(0);

	const { sendMessage } = useMultizap();

	const handleGetEarlierMessages = async () => {
		setLoadingEarlier(true);
		await loadEarlierMessages();
		setLoadingEarlier(false);
	};

	const parseMessage = (message: SessionChatMessage) => {
		switch (message.type) {
		case MessageType.IMAGE:
			return <ImageMessage message={message}/>;

		case MessageType.DOCUMENT:
			return "🗄[DOCUMENTO]";

		case MessageType.REVOKED_MESSAGE:
			return "🗑[DELETADO]";

		case MessageType.STICKER:
			return "🙂[FIGURINHA]";

		case MessageType.VOICE_AUDIO:
			return "🎵[AUDIO DE VOZ]";

		default:
			return message.content;
		}
	};

	useEffect(() => {
		containerRef.current.addEventListener("scroll", () => {
			// const {
			//     scrollHeight,
			//     scrollTop,
			//     offsetTop,
			//     offsetHeight
			// } = containerRef.current;
			// console.log({
			//     scrollHeight,
			//     scrollTop,
			//     offsetTop,
			//     offsetHeight,
			// })

			setLastScrollHeight(containerRef.current.scrollHeight);
			setLastScrollTop(containerRef.current.scrollTop);
			setLastOffsetHeight(containerRef.current.offsetHeight);
		});
	}, [containerRef]);

	useEffect(() => {
		if (lastScrollHeight - lastOffsetHeight == lastScrollTop) {
			containerRef.current.scroll({
				behavior: "smooth",
				top: containerRef.current.scrollHeight
			});
		}
	}, [messages.length]);

	useEffect(() => {
		containerRef.current.scroll({
			behavior: "auto",
			top: containerRef.current.scrollHeight
		});
	}, [chat.id]);

	return (
		<>
			<Container ref={containerRef}>
				<Button disabled={loadingEarlier} onClick={handleGetEarlierMessages}>Carregar Mais</Button>
				<MessageContainer>
					{messages.map((message) =>
						<Message key={message.id} isMe={sessionData.clientId === message.senderId}>
							{parseMessage(message)}
						</Message>
					)}
				</MessageContainer>
			</Container>
			<InputFooter onTextSubmit={(val) => { sendMessage(sessionData.id, chat.id, val); }}></InputFooter>
		</>
	);
};

export interface MessageProps {
    message: SessionChatMessage
}

export const ImageMessage: FC<MessageProps> = ({ message }) => {
	return (
		<img src={`data:image/png;base64,${message.content}`} alt="Image"/>
	);
};

export default ChatMain;
