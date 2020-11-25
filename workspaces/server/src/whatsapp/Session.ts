import { SessionData, SessionState } from '@common/whatsapp/sessions';
import { SessionChat } from '@common/whatsapp/sessions/chats';
import { SessionAckMessage, SessionChatMessage } from '@common/whatsapp/sessions/chats/messages';
import { Dictionary } from '@common/communication';
export interface SessionEmitter {
    "contact_message": {message: string}
    "connection_status": {message: string}
}

export type MessageListener<T> = (chatId: string, data: T) => void

export abstract class WhatsappSession {

    readonly token: string;
    
    state: SessionState;

    abstract sendMessage(chatId: string, message: string): Promise<object>;
    
    abstract async loadEarlierMessages(chatId: string): Promise<Dictionary<SessionChatMessage>>

    abstract async loadChatMessages(chatId: string): Promise<Dictionary<SessionChatMessage>>

    abstract async waitBatteryPercentage(): Promise<number>;

    abstract async loadChats(): Promise<SessionChat[]>;
    
    abstract async render(): Promise<SessionData>;

    abstract onMessage(listener: MessageListener<SessionChatMessage>): void;

    abstract onAck(listener: MessageListener<SessionAckMessage>): void;

    
}

export interface CreateSessionProps {
    name: string
    token: string,
    qrListener: (qrCode: string) => void
}


export type createSession<T extends WhatsappSession> = (props: CreateSessionProps) => Promise<T>