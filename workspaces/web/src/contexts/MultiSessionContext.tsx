import { Dictionary, MessageHeader, SessionChatMessageDictionary } from "@common/communication";
import { SessionData } from "@common/whatsapp/sessions";
import { SessionChatMessage } from "@common/whatsapp/sessions/chats/messages";
import React, { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import SessionWS from "../services/SessionWS";
import { getReducer } from "./reducers/SessionChatMessage";

export type SessionDataMap = Record<string, SessionData>;

export enum ConnectionStatus {
    CONNECTED,
    CONNECTING,
    DISCONNECTED,
    CONNECTION_ERROR
}

export interface MultizapContextProps {
    sessions: SessionDataMap
    connectionStatus: ConnectionStatus
    sessionChatMessages: SessionChatMessageDictionary
}

export interface MultizapContextFunctions {
    getSession: (id: string) => SessionData
    listSessions: () => SessionData[]
    getOrLoadMessages: (sessionId: string, chatId: string) => Promise<Dictionary<SessionChatMessage>>
    loadEarlierMessages: (sessionId: string, chatId: string) => Promise<Dictionary<SessionChatMessage>>
    createSession: (name: string, qrListener: (qrcode: string) => void) => Promise<SessionData>
    initWebSocketConnection: () => void,

    sendMessage: (sessionId: string, chatId: string, message: string) => Promise<void>
}


export type MultizapContext = MultizapContextProps & MultizapContextFunctions;

const Context = createContext<MultizapContext>({} as MultizapContext);
const { Provider } = Context;



export const MultizapProvider: FC = ({children}) => {

    const [sessions, setSessions] = useState<SessionDataMap>({});

    const [wsConnection, setWsConnection] = useState<SessionWS>(null);

    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>();

    const [sessionChatMessages, dispatchChatMessages] = getReducer<SessionChatMessageDictionary>({});
    
    const updateMessage = useCallback((sessionId: string, chatId: string, message: SessionChatMessage) => {
        console.log(`new message: ${message}`)
        dispatchChatMessages(state => {
            return {
                ...state,
                [sessionId]: {
                    ...(state[sessionId] ? state[sessionId] : {}),
                    [chatId]: {
                        ...(state[sessionId] && state[sessionId][chatId] ? state[sessionId][chatId] : {}),
                        [message.id]: message,
                    }
                }
            }
        });
    }, [sessionChatMessages, wsConnection]);
    
    const updateMessages = useCallback((sessionId: string, chatId: string, messages: Dictionary<SessionChatMessage>) => {
        dispatchChatMessages(state => {
            return {
                ...state,
                [sessionId]: {
                    ...(state[sessionId] ? state[sessionId] : {}),
                    [chatId]: {
                        ...(state[sessionId] && state[sessionId][chatId] ? state[sessionId][chatId] : {}),
                        ...messages
                    }
                }
            }
        });
    }, [sessionChatMessages, wsConnection]);

    const updateEarlierMessages = useCallback((sessionId: string, chatId: string, messages: Dictionary<SessionChatMessage>) => {
        dispatchChatMessages(state => {
            return {
                ...state,
                [sessionId]: {
                    ...(state[sessionId] ? state[sessionId] : {}),
                    [chatId]: {
                        ...messages,
                        ...(state[sessionId] && state[sessionId][chatId] ? state[sessionId][chatId] : {}),
                    }
                }
            }
        });
    }, [sessionChatMessages, wsConnection]);

    const initWebSocketConnection = useCallback(async () => {
        const ws = new SessionWS(process.env.REACT_APP_WS_CONN_URL);
        console.log("Connecting to ws");
        setSessions({});
        dispatchChatMessages(() => ({}));
        
        setConnectionStatus(ConnectionStatus.CONNECTING);
        await ws.connect().then(() => {
            setWsConnection(ws);
            
            console.log("Connected to ws");
            setConnectionStatus(ConnectionStatus.CONNECTED);


            ws.onceMessage(MessageHeader.SESSIONS_DATA, ({sessions}) => {
                setSessions(sessions.reduce((prev, curr) => ({...prev, [curr.id]: curr}), {}));
            });

            ws.sendMessage(MessageHeader.GET_SESSIONS);

            ws.onMessage(MessageHeader.CHAT_MESSAGES, ({sessionId, chatId, messages}) => {
                updateMessages(sessionId, chatId, messages);
            });

            ws.onMessage(MessageHeader.NEW_CHAT_MESSAGE, ({sessionId, chatId, message}) => {
                updateMessage(sessionId, chatId, message);
            });

            ws.onMessage(MessageHeader.EARLIER_CHAT_MESSAGES_DATA, ({sessionId, chatId, messages}) => {
                updateEarlierMessages(sessionId, chatId, messages);
            });


            
        }).catch((e) => {
            console.log("Error when connecting to ws: "+ e);
            setConnectionStatus(ConnectionStatus.CONNECTION_ERROR);
        });

        ws.on('disconnect', (event) => {
            console.log("Disconnected from ws: ", event);
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        });
    }, [connectionStatus, wsConnection]);

    useEffect(() => {
        initWebSocketConnection();
    }, []);


    const functions: MultizapContextFunctions = {
        initWebSocketConnection,

        getSession(id: string) {
            return sessions[id];
        },

        listSessions() {
            return Object.values(sessions);
        },

        async sendMessage(sessionId: string, chatId: string, message: string) {
            wsConnection.sendMessage(MessageHeader.SEND_MESSAGE, {chatId, message, sessionId});
        },

        getOrLoadMessages: useCallback(async (sessionId: string, chatId: string) => {
            if(!wsConnection)
                throw new Error("There's no Web Socket connection for handling chat messages!");
            if(!sessionChatMessages[sessionId] || !sessionChatMessages[sessionId][chatId]){
                return new Promise(rs => {
                    const listenToChatResponse = () => {
                        wsConnection.onceMessage(MessageHeader.CHAT_MESSAGES, ({chatId: gottenChatId, messages, sessionId: gotterSessionId}) => {
                            if(sessionId === gotterSessionId && chatId === gottenChatId)
                                rs(messages);
                            else
                                listenToChatResponse();
                        });
                    }

                    listenToChatResponse();

                    wsConnection.sendMessage(MessageHeader.GET_CHAT_MESSAGES, {sessionId, chatId});
                });
            }
            return sessionChatMessages[sessionId][chatId];
        }, [sessionChatMessages, wsConnection]),
        
        loadEarlierMessages: useCallback(async (sessionId: string, chatId: string) => {
            if(!wsConnection)
                throw new Error("There's no Web Socket connection for handling chat messages!");

            return new Promise(rs => {
                const listenToChatResponse = () => {
                    wsConnection.onceMessage(MessageHeader.EARLIER_CHAT_MESSAGES_DATA, ({chatId: gottenChatId, messages, sessionId: gotterSessionId}) => {
                        if(sessionId === gotterSessionId && chatId === gottenChatId)
                            rs(messages);
                        else
                            listenToChatResponse();
                    });
                }

                listenToChatResponse();

                wsConnection.sendMessage(MessageHeader.GET_EARLIER_CHAT_MESSAGES, {sessionId, chatId});
            });
        }, [sessionChatMessages, wsConnection]),

        async createSession(name:string, qrListener: (qrcode: string) => void): Promise<SessionData> {
            return new Promise((rs, rj) => {
                const sessionMark = `session_${Date.now()}`;
                wsConnection.sendMessage(MessageHeader.CREATE_SESSION, {mark: sessionMark, name});
                wsConnection.onMessage(MessageHeader.SESSION_CREATE_QR_UPDATE, ({qrcode}) => {
                    qrListener(qrcode);
                });
                wsConnection.onMessage(MessageHeader.SESSION_CREATE_QR_ERROR, ({mark}) => {
                    if(mark === sessionMark)
                        rj("Error");
                });

                wsConnection.onMessage(MessageHeader.SESSION_CREATED, ({mark, session}) => {
                    if(mark === sessionMark)
                        rs(session);

                        setSessions({...sessions, [session.id]: session})
                });
            })
        }
    }


    return (
        <Provider value={{sessionChatMessages, sessions, connectionStatus, ...functions}}>
            {children}
        </Provider>
    );
}

export const useMultizap = () => useContext(Context)