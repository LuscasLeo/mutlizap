import { SessionData } from "../whatsapp/sessions";
import { SessionAckMessage, SessionChatMessage } from "../whatsapp/sessions/chats/messages";

export enum MessageHeader {
    CREATE_SESSION = "CREATE_SESSION",
    SEND_MESSAGE = "SEND_MESSAGE",
    
    SESSION_CREATED = "SESSION_CREATED",
    SESSION_CREATE_QR_UPDATE = "SESSION_CREATE_QR_UPDATE",
    SESSION_CREATE_QR_ERROR = "SESSION_CREATE_QR_ERROR",
    SESSION_STATE_UPDATE = "SESSION_STATE_UPDATE",

    GET_SESSIONS = "GET_SESSIONS",   
    SESSIONS_DATA = "SESSIONS_DATA",
    
    NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE",
    GET_CHAT_MESSAGES = "GET_CHAT_MESSAGES",
    GET_EARLIER_CHAT_MESSAGES = "GET_EARLIER_CHAT_MESSAGES",
    EARLIER_CHAT_MESSAGES_DATA = "EARLIER_CHAT_MESSAGES_DATA",
    CHAT_MESSAGES = "CHAT_MESSAGES",
    CHAT_MESSAGE_ACKNOWLEDGE = "CHAT_MESSAGE_ACKNOWLEDGE",
}

export type Dictionary<T> = Record<string, T>;
export type SessionChatMessageDictionary = Dictionary<Dictionary<Dictionary<SessionChatMessage>>>;

 
export type ClientEventsTypes = {
    [MessageHeader.SESSION_CREATE_QR_ERROR]: {mark: string, error: any}
    [MessageHeader.SESSION_CREATE_QR_UPDATE]: {mark: string, qrcode: string}
    [MessageHeader.SESSION_CREATED]: {mark: string, session: SessionData}
    [MessageHeader.NEW_CHAT_MESSAGE]: {sessionId: string, chatId: string, message: SessionChatMessage}
    [MessageHeader.CHAT_MESSAGES]: {sessionId: string, chatId: string, messages: Dictionary<SessionChatMessage>}
    [MessageHeader.EARLIER_CHAT_MESSAGES_DATA]: {sessionId: string, chatId: string, messages: Dictionary<SessionChatMessage>}
    [MessageHeader.SESSIONS_DATA]: {sessions: SessionData[]},
    [MessageHeader.CHAT_MESSAGE_ACKNOWLEDGE]: {sessionId: string, chatId: string, data: SessionAckMessage}
}

export interface ServerEventTypes {
    [MessageHeader.CREATE_SESSION]: {mark: string, name: string}
    [MessageHeader.SEND_MESSAGE]: {sessionId: string, chatId: string, message: string}
    [MessageHeader.GET_SESSIONS]: {}
    [MessageHeader.GET_CHAT_MESSAGES]: {sessionId: string, chatId: string}
    [MessageHeader.GET_EARLIER_CHAT_MESSAGES]: {sessionId: string, chatId: string}
}
