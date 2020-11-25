import { SessionData } from "../../../common/whatsapp/sessions";
import { WhatsappSession } from "../whatsapp/Session";

export default class SessionManager {
    private static sessions: {[id: string]: WhatsappSession} = {};

    static registerSession(session: WhatsappSession) {
        return this.sessions[session.token] = session;
    }

    static getSessionList() {
        return Object.values(this.sessions);
    }

    static getSession(id: string): WhatsappSession {
        return this.sessions[id];
    }
}