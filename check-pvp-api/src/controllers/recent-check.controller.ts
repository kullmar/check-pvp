import express from 'express';
import { SearchHistory } from 'check-pvp-common/models';
import _ from 'lodash';
import recentChecks from 'util/recent-checks';

interface UpdateMessage {
    index: number;
    timestamp: number;
}

export class RecentCheckController {
    private readonly REPORT_INTERVAL_MS = 10000;
    private readonly PING_INTERVAL_MS = 20000;
    private readonly BUFFER_LEN = 30;
    private openStreams: any[];
    private pingInterval: NodeJS.Timeout;
    private reportInterval: NodeJS.Timeout;

    constructor() {
        this.openStreams = [];
        this.attachListeners();
        this.pingInterval = setInterval(this.sendPingMessage, this.PING_INTERVAL_MS);

    }

    openStream = (req: express.Request, res: express.Response) => {
        // SSE Setup
        console.log('New connection!');

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        });
        res.write('event: initial\n');
        res.write(`data: ${JSON.stringify(recentChecks.getArray())}\n\n`);

        this.openStreams.push(res);
        console.log(`Active connections: ${this.openStreams.length}`);

        req.on('close', () => {
            _.pull(this.openStreams, res);
            console.log('Connection closed');
            console.log(`Active connections: ${this.openStreams.length}`);
        });
    };

    private attachListeners = () => {
        recentChecks.emitter.on('new', this.sendNewMessage);
        recentChecks.emitter.on('update', this.sendUpdateMessage);
    };

    private sendNewMessage = (check: SearchHistory) => {
        this.openStreams.forEach(stream => {
            stream.write('event: new\n');
            stream.write(`data: ${JSON.stringify(check)}\n\n`);
        });
    };
    private sendPingMessage = () => {
        this.openStreams.forEach(stream => {
            stream.write(': Ping\n\n');
        });
    };

    private sendUpdateMessage = (data: UpdateMessage) => {
        this.openStreams.forEach(stream => {
            stream.write('event: update\n');
            stream.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    };
}

export default new RecentCheckController();
