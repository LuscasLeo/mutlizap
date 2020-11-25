import { SessionChat } from "./chats";

export enum SessionState {
    AUTHENTICATED = "AUTHENTICATED",
    LOADING = "LOADING",
    UNAUTHENTICATED = "UNAUTHENTICATED",
    AUTH_ERROR = "AUTH_ERROR",
}


export interface SessionData {
    id: string,
    clientId: string,
    name: string,
    chats: Record<string, SessionChat>,
    profilePicUrl?: string,
    batteryPercentage?: number,
    state: SessionState,
}
