import { Server } from "ws";
import {MessageParser} from "./parser";

export default class WebSocketServer<T> {
    readonly server: Server;
    private parser: MessageParser<T>;

    constructor(parser: MessageParser<T>, server: Server) {
        this.server = server;
        this.parser = parser;
    }

    async broadcast(data: any) {
        this.server.clients.forEach(client => {
            client.send(data);
        })
    }
}
