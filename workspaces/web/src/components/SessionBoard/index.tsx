import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dictionary } from "@common/communication";
import { SessionChatMessage } from "@common/whatsapp/sessions/chats/messages";
import { useAppTitle } from "../../contexts/AppTitleContext";
import { ConnectionStatus, useMultizap } from "../../contexts/MultiSessionContext";
import { AppGrid } from "../../styles";
import ChatMain from "../ChatMain";
import ChatsSidebar from "../ChatsSidebar";
import CommonFooter from "../CommonFooter";
import { MainContainer } from "../Dashboard/styles";
import MainHeader from "../MainHeader";
import SessionsSidebar from "../SessionsSidebar";

const SessionBoard: FC = () => {

    const appTitle = useAppTitle();
	

    const {sessionid, chatid} = useParams<{sessionid: string, chatid: string}>();

    const {getSession, getOrLoadMessages, connectionStatus, loadEarlierMessages: loadEarlier, sessionChatMessages} = useMultizap();

    const sessionData = getSession(sessionid);

    const chat = sessionData && !!chatid ? sessionData.chats[chatid] : null;

    const [messages, setMessages] = useState<SessionChatMessage[]>([]);

    useEffect(() => {
        setMessages(sessionChatMessages[sessionid] && sessionChatMessages[sessionid][chatid] ? Object.values(sessionChatMessages[sessionid][chatid]) : []);
    }, [sessionChatMessages, chatid, sessionid, connectionStatus]);

    useEffect(() => {
        if(connectionStatus == ConnectionStatus.CONNECTED && sessionid && chatid)
            getOrLoadMessages(sessionid, chatid);
    }, [connectionStatus, sessionid, chatid]);

    const loadEarlierMessages = async () => {
        await loadEarlier(sessionid, chatid);
    }
    
    return (
        <AppGrid>
            <MainHeader />

            {sessionData ? <ChatsSidebar {...{sessionData}} /> : <SessionsSidebar />}
            {!!chat ? (
                <>
                    <ChatMain {...{
                        chat,
                        messages,
                        sessionData,
                        loadEarlierMessages,
                    }} />
                </>
            ) : (
                <>
                    <MainContainer>
                        <h2>Selecione um chat💬</h2>
                    </MainContainer>
                    <CommonFooter />
                </>
            )}
        </AppGrid>
    )
}

export default SessionBoard;
