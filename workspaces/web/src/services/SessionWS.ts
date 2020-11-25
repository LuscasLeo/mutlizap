import { EventEmitter } from "events";
import WebSocketClient, { MessageParser } from "./ws";
import { ClientEventsTypes, ServerEventTypes } from "@common/communication";
import { ICloseEvent } from "websocket";

export type SessionWSEventTypes = {
	"close": (event: ICloseEvent) => void,
	"disconnect": (event: ICloseEvent) => void
}

export class SessionWS extends EventEmitter {
	private client: WebSocketClient<any>;
	private connected: boolean;
	
	constructor (connectionUrl: string) {
		super();
		this.client = new WebSocketClient(jsonParser, connectionUrl);
		this.connected = false;
	}
	
	async connect () {
		return new Promise<void>((resolve, reject) => {
			this.client.on("connect", () => {
				this.connected = true;
				resolve();
			});
			
			this.client.on("error", reject);
			
			this.client.on("close", (event) => {
				this.emit("close", event);
				if (this.connected) {
					this.connected = false;
					this.emit("disconnect", event);
				}
			});
			
			this.client.on("message", ({ header, payload }) => {
				this.emit(`MESSAGE_${header}`, payload);
			});
			
			this.client.connect();
		});
	}
	
	on<U extends keyof SessionWSEventTypes> (event: U, listener: SessionWSEventTypes[U]) {
		super.on(event, listener);
		return this;
	}
	
	onMessage<U extends keyof ClientEventsTypes> (header: U, listener: (payload: ClientEventsTypes[U]) => void) {
		super.on(`MESSAGE_${header}`, listener);
		return this;
	}
	
	onceMessage<U extends keyof ClientEventsTypes> (header: U, listener: (payload: ClientEventsTypes[U]) => void) {
		super.once(`MESSAGE_${header}`, listener);
		return this;
	}
	
	sendMessage<U extends keyof ServerEventTypes> (header: U, payload?: ServerEventTypes[U]) {
		this.client.send({
			header,
			payload
		});
	}
}

export default SessionWS;

export const jsonParser: MessageParser<any> = {
	encode: data => JSON.stringify(data),
	decode: messageEvent => JSON.parse(messageEvent.data.toString("utf8"))
};

export interface JsonMessage {
	header: string
	payload: any
}
