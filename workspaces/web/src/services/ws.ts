// import socketio from 'socket.io-client'

import { EventEmitter } from "events";
import { ICloseEvent, IMessageEvent, w3cwebsocket } from "websocket";
import SessionWS from "./SessionWS";


export interface MessageParser<T> {
    encode: (data: T) => any
    decode: (messageEvent: IMessageEvent) => T
}

export type SessionEvents<T> = {
    "close": (event: ICloseEvent) => void
    "message": (data: T) => void
    "connect": () => void
    "error": (error: Error) => void
}

export class WebSocketClient<T> extends EventEmitter{
    private connection: w3cwebsocket;
    private parser: MessageParser<T>;
    private connectionUrl: string;

    constructor(parser: MessageParser<T>, connectionUrl: string) {
        super();
        this.parser = parser;
        this.connectionUrl = connectionUrl;
    }

    connect() {
        this.connection = new w3cwebsocket(this.connectionUrl);
        this.connection.onopen = () => {
            this.emit("connect");
        }

        this.connection.onerror = (error) => {
            this.emit("error", error);
        }

        this.connection.onmessage = (message) => {
            this.emit("message", this.parser.decode(message));
        }

        this.connection.onclose = (event) => {
            this.emit("close", event);
        }
        
    }

    on<U extends keyof SessionEvents<T>>(event: U, listener: SessionEvents<T>[U]) {
        super.on(event, listener);
        return this;
    }

    send(data: T) {
        this.connection.send(this.parser.encode(data));
    }

    close() {
        this.connection.close();
    }
}

export default WebSocketClient;

