import { createSession, CreateSessionProps, MessageListener, WhatsappSession } from "./Session";
import * as wprovider from 'venom-bot';
import { SessionChat, SessionChatType } from "@common/whatsapp/sessions/chats";
import { SessionData, SessionState } from "@common/whatsapp/sessions";
import { SessionChatMessage, MessageType, SessionAckMessage, SesssionAckType } from "@common/whatsapp/sessions/chats/messages";
import { Dictionary } from "@common/communication";


export const createVenomSession: createSession<VenomWhatsappSession> = ({name, token, qrListener}: CreateSessionProps) => {
    return new Promise<VenomWhatsappSession>(async (rs,rj) => {
        try{

            const client = await wprovider.create(token, qrListener, (status, session) => {
                //TODO: Use this callback listsner somewhere
            },{
                logQR: false,
                createPathFileToken: false,
                puppeteerOptions: {},
                updatesLog: false,
                disableWelcome: true,
                disableSpins: true,
                
            });

            rs(new VenomWhatsappSession(name, token, client));
        } catch{
            rj(undefined);
        }
    });
}

export class VenomWhatsappSession extends WhatsappSession {
    private session: wprovider.Whatsapp;
    private lastRenderedData: SessionData;
    private lastRenderedTimestamp: number;
    private name: string;
    
    public readonly token: string;
    public state: SessionState;

    private chatMessages: {[key: string]: Dictionary<SessionChatMessage>}
    private loadingChatMessages: {[key: string]: Promise<wprovider.Message[]>}

    private renderedData: SessionData;
    
    constructor(name: string, token: string, session: wprovider.Whatsapp) {
        super();
        this.state = SessionState.AUTHENTICATED;
        this.name = name;
        this.token = token;
        this.session = session;
        this.chatMessages = {};
        this.loadingChatMessages = {};
        this.renderedData = null;

    }
    
    async waitBatteryPercentage(): Promise<number> {
        return await this.session.getBatteryLevel();
    }

    private renderChatMessage(message: wprovider.Message): SessionChatMessage {
        return {
            id: message.id,
            content: message.content || message.body || "",
            senderId: message.sender && (message.sender.id as any)._serialized || "unknown_id",
            type: this.parseMessageType(message.type),
            message
        } as any
    }

    private renderAckMessage(ack: wprovider.Ack): SessionAckMessage {
        return {
            ack
        } as any
    }

    private parseAckType(type: wprovider.AckType): SesssionAckType{
        switch(type) {
            case wprovider.AckType.MD_DOWNGRADE:
                return SesssionAckType.MD_DOWNGRADE;

            case wprovider.AckType.INACTIVE:
                return SesssionAckType.INACTIVE;

            case wprovider.AckType.CONTENT_UNUPLOADABLE:
                return SesssionAckType.CONTENT_UNUPLOADABLE;

            case wprovider.AckType.CONTENT_TOO_BIG:
                return SesssionAckType.CONTENT_TOO_BIG;

            case wprovider.AckType.CONTENT_GONE:
                return SesssionAckType.CONTENT_GONE;

            case wprovider.AckType.EXPIRED:
                return SesssionAckType.EXPIRED;

            case wprovider.AckType.FAILED:
                return SesssionAckType.FAILED;

            case wprovider.AckType.CLOCK:
                return SesssionAckType.CLOCK;

            case wprovider.AckType.SENT:
                return SesssionAckType.SENT;

            case wprovider.AckType.RECEIVED:
                return SesssionAckType.RECEIVED;

            case wprovider.AckType.READ:
                return SesssionAckType.READ;

            case wprovider.AckType.PLAYED:
                return SesssionAckType.PLAYED;
            
            default:
                return SesssionAckType.FAILED;
        }
    }

    
    private parseMessageType(value: string): MessageType {
        switch(value) {
            case "image":
                return MessageType.IMAGE;
            case "document":
                return MessageType.DOCUMENT;
            case "revoked":
                return MessageType.REVOKED_MESSAGE;
            case "sticker":
                return MessageType.STICKER;
            case "ptt":
                return MessageType.VOICE_AUDIO;
            case "chat":
            default:
                return MessageType.TEXT;
        }
    }

    private parseMessageDictionary(messages: SessionChatMessage[]): Dictionary<SessionChatMessage> {
        return messages.reduce((prev, curr) => ({
            ...prev,
            [curr.id]: curr
        }), {});
    }

    async loadChatMessages(chatId: string): Promise<Dictionary<SessionChatMessage>> {
        if(this.chatMessages[chatId])
            return this.chatMessages[chatId];

        if(this.loadingChatMessages[chatId])
            return  this.parseMessageDictionary((await this.loadingChatMessages[chatId]).map(m => this.renderChatMessage(m)));
        
        const chat = await (this.loadingChatMessages[chatId] = this.session.getAllMessagesInChat(chatId, true, false));

        delete this.loadingChatMessages[chatId];
        

        return this.chatMessages[chatId] = this.parseMessageDictionary(chat.map<SessionChatMessage>(m => this.renderChatMessage(m)));
    }
    
    async loadEarlierMessages(chatId: string): Promise<Dictionary<SessionChatMessage>> {
        if(this.loadingChatMessages[chatId])
            return  this.parseMessageDictionary((await this.loadingChatMessages[chatId]).map(m => this.renderChatMessage(m)));
        
        const messages = await (this.loadingChatMessages[chatId] = this.session.loadEarlierMessages(chatId));

        delete this.loadingChatMessages[chatId];

        if(messages) {
            const rendered = this.parseMessageDictionary(messages.map(m => this.renderChatMessage(m)));
            this.chatMessages[chatId] = {
                ...rendered,
                ...this.chatMessages[chatId]
            };
            return rendered;
        }

        
        
        return {};
    }

    async loadChats(): Promise<SessionChat[]> {
        return (await this.session.getAllChats()).map<SessionChat>(chat => ({
            id: chat.id._serialized,
            name: chat.name || chat.id.user,
            type: chat.isGroup ? SessionChatType.GROUP : SessionChatType.CONTACT
        }))
    }
    

    async render(): Promise<SessionData> {
        return  this.renderedData || (this.renderedData = {
            id: this.token,
            clientId: (await this.session.getHostDevice()).wid._serialized,
            name: this.name,
            chats: (await this.loadChats()).reduce((prev, current) => ({...prev, [current.id]: current}), {}),
            state: this.state,
            batteryPercentage: await this.waitBatteryPercentage(),
        })
    }

    onMessage(listener: MessageListener<SessionChatMessage>) {
        this.session.onMessage((message) => {
            const rendered = this.renderChatMessage(message);
            this.chatMessages[message.chatId] = {...this.chatMessages[message.chatId], rendered};
            listener(message.chatId, rendered);
        });
    }
    
    onAck(listener: MessageListener<SessionAckMessage>) {
        this.session.onAck((message) => {
            const rendered = this.renderAckMessage(message);
            this.chatMessages[rendered.chatId] = {
                ...(this.chatMessages[rendered.chatId] || {})
            }
            listener(rendered.chatId, rendered);
        });
    }

    async sendMessage(chatId: string, message: string): Promise<object> {
        return await this.session.sendText(chatId, message);
    }

}
