import { ClientEventsTypes, MessageHeader, ServerEventTypes } from '@common/communication';
import { IncomingMessage } from 'http';
import { v4 as uuid } from 'uuid';
import WebSocket from 'ws';
import SessionManager from "../runtime/SessionManager";
import { createVenomSession } from '../whatsapp/venom';
import WebSocketServer from "./index";
import { jsonParser } from "./parser";


export const handleJsonConnection = (server: WebSocketServer<any>) => {
 return (clientSocket: WebSocket, headerMessage: IncomingMessage) => {
        clientSocket.on('message', (data) => {
            const jsonData = JSON.parse(data.toString());
            const {header, payload} = jsonData as {header: keyof ServerEventTypes, payload: any};

            const handler = jsonHandlers[header];

            console.log(`New Message request with header ${header}`)
            
            if(handler){
                handler(clientSocket, payload || {}, server).catch(console.trace);
            } else console.log(`No handler for header ${header}`);
        });
    }
}

export type WebSocketHandlerList = {
    [header in keyof ServerEventTypes]: (clientSocket: WebSocket, payload: ServerEventTypes[header], server: WebSocketServer<any>) => Promise<void>;
};


export const jsonHandlers = (<WebSocketHandlerList>{
    [MessageHeader.CREATE_SESSION]:  async (clientSocket, {mark, name}, server) => {
        const token = uuid();
        try{
            const session = await createVenomSession({
                name,
                token,
                qrListener: (qrcode) => {
                    clientSocket.send(encode(MessageHeader.SESSION_CREATE_QR_UPDATE, {mark, qrcode}))
                }
            });

            session.onMessage((chatId, message) => {
                server.broadcast(encode(MessageHeader.NEW_CHAT_MESSAGE, {sessionId: token, chatId, message}))
            });

            
            session.onAck((chatId, data) => {
                server.broadcast(encode(MessageHeader.CHAT_MESSAGE_ACKNOWLEDGE, {sessionId: token,chatId, data}))
            });

            SessionManager.registerSession(session);
            
            clientSocket.send(encode(MessageHeader.SESSION_CREATED, {
                mark,
                session: await session.render()
            }))
            
        } catch(error) {
            console.trace(error);
            clientSocket.send(encode(MessageHeader.SESSION_CREATE_QR_ERROR, {mark, error}));
        }
    },

    [MessageHeader.GET_SESSIONS]: async (client, {}, server) => {
        client.send(encode(MessageHeader.SESSIONS_DATA, {
            sessions: await Promise.all(SessionManager.getSessionList().map(session => session.render()))
        }))
    },

    [MessageHeader.GET_CHAT_MESSAGES]: async (client, {chatId, sessionId}, server) => {
        const session = SessionManager.getSession(sessionId);
        if(!session)
            return client.send(encode(MessageHeader.CHAT_MESSAGES, {chatId, sessionId, messages: {}}))

        const messages = await session.loadChatMessages(chatId);
        return client.send(encode(MessageHeader.CHAT_MESSAGES, {chatId, sessionId, messages}));
    },

    [MessageHeader.GET_EARLIER_CHAT_MESSAGES]: async (client, {chatId, sessionId}, server) => {
        const session = SessionManager.getSession(sessionId);
        if(!session)
            return client.send(encode(MessageHeader.EARLIER_CHAT_MESSAGES_DATA, {chatId, sessionId, messages: {}}))

        const messages = await session.loadEarlierMessages(chatId);

        return client.send(encode(MessageHeader.EARLIER_CHAT_MESSAGES_DATA, {chatId, sessionId, messages}));
    },
    
    [MessageHeader.SEND_MESSAGE]: async (client, {chatId, sessionId, message}, server) => {
        const session = SessionManager.getSession(sessionId);
        if(!session)
            return;
        const a = await session.sendMessage(chatId, message);
    }
});

const encode = <U extends keyof ClientEventsTypes>(header: U, payload: ClientEventsTypes[U]) => {
    return jsonParser.encode({
        header,
        payload
    })
}