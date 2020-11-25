import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { SessionData } from "../../../../common/whatsapp/sessions";
import { SessionChatType } from "../../../../common/whatsapp/sessions/chats";
import Sidebar from "../Sidebar";
import List from "../Sidebar/List";
import ListItem from "../Sidebar/List/ListItem";
import { ClickableListItem } from "../Sidebar/List/ListItem/styles";

export interface ChatsSidebarProps {
    sessionData: SessionData
}

const ChatsSidebar: FC<ChatsSidebarProps> = ({sessionData: {chats, ...sessionData}}) => {

    const history = useHistory();

    return (
        <Sidebar>
            <List>
                <ListItem>
                    <span>📱</span>
                    <h3>{sessionData.name}</h3>
                </ListItem>
                {Object.values(chats).map(chat => (
                    <ClickableListItem onClick={() => history.push(`/${sessionData.id}/${chat.id}`)} key={chat.id}>
                        {chat.type === SessionChatType.GROUP ? '👥': '👤'}{chat.name}
                    </ClickableListItem>
                ))}
            </List>
        </Sidebar>
    )
}

export default ChatsSidebar;
