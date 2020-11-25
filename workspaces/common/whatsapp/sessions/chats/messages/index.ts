export interface SessionChatMessage {
    id: string
    chatId: string
    content: string
    senderId: string
    type: MessageType
}

export interface SessionAckMessage {
    chatId: string,
    ackType: SesssionAckType
}

export enum SesssionAckType {
    MD_DOWNGRADE = "MD_DOWNGRADE",
    INACTIVE = "INACTIVE",
    CONTENT_UNUPLOADABLE = "CONTENT_UNUPLOADABLE",
    CONTENT_TOO_BIG = "CONTENT_TOO_BIG",
    CONTENT_GONE = "CONTENT_GONE",
    EXPIRED = "EXPIRED",
    FAILED = "FAILED",
    CLOCK = "CLOCK",
    SENT = "SENT",
    RECEIVED = "RECEIVED",
    READ = "READ",
    PLAYED = "PLAYED",
}

export enum MessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    DOCUMENT = "DOCUMENT",
    VOICE_AUDIO = "VOICE_AUDIO",
    REVOKED_MESSAGE = "REVOKED_MESSAGE",
    STICKER = "STICKER",
}