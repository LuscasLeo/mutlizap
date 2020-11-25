
export enum SessionChatType {
    GROUP = "GROUP",
    CONTACT = "CONTACT",
}

export interface SessionChat {
    id: string,
    name: string,
    type: SessionChatType,
}