import RecentCheckArray from 'util/RecentCheckArray';
import { EventEmitter } from 'events';
import { SearchHistory } from 'check-pvp-common/models';
import _ from 'lodash';

interface UpdateMessage {
    index: number;
    timestamp: number;
}

export class RecentCheckController {
    private bufferLen = 30;
    private recentChecks = new RecentCheckArray(this.bufferLen);

    private openStreams: any[] = [];

    openStream(req: any, res: any) {
        // SSE Setup
        console.log('New connection!');

        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        });
        res.write('event: initial\n');
        res.write(`data: ${JSON.stringify(this.recentChecks.getArray())}\n\n`);

        this.openStreams.push(res);
        console.log(`Active connections: ${this.openStreams.length}`);

        req.on('close', () => {
            _.pull(this.openStreams, res);
            console.log('Connection closed');
            console.log(`Active connections: ${this.openStreams.length}`);
        });
    }

    private sendMessageOnCheck = (check: SearchHistory) => {
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
