
import 'reflect-metadata';
import express from 'express';
import {Server as HTTPServer} from 'http';
import WebSocketServer from './websocket';
import {Server} from 'ws';
import { jsonParser } from './websocket/parser';
import cors from 'cors';
import { handleJsonConnection, jsonHandlers } from './websocket/handler';
import {connect as connectDB} from './database/connection'
import * as wa from '@open-wa/wa-automate';




async function Main() {
    const port = Number(process.env.API_WS_PORT || '2998');

    await connectDB();
    const app = express();

    const httpServer = new HTTPServer(app);

    const webSocketServer = new WebSocketServer(jsonParser, new Server({server: httpServer}));

    app.use(express.json());
    app.use(cors());
    app.use(express.json());

    webSocketServer.server.on("connection", handleJsonConnection(webSocketServer));

    await new Promise(rs => httpServer.listen(port, rs));
    console.log(`Server running at port ${port} for both Rest and Web Socket`);
    
}

Main().catch(console.log);