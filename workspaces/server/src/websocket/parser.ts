import WebSocket, { Data } from "ws";
import {IncomingMessage} from 'http';

export interface MessageParser<T> {
    encode: (data: T) => any
    decode: (data: Data) => T
}

export const jsonParser: MessageParser<any> = {
    encode: (data) => JSON.stringify(data),
    decode: (data) => JSON.parse(data.toString('utf-8'))
}
