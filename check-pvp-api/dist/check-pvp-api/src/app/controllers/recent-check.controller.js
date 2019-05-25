"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recent_check_array_1 = __importDefault(require("util/recent-check-array"));
const lodash_1 = __importDefault(require("lodash"));
class RecentCheckController {
    constructor() {
        this.bufferLen = 30;
        this.recentChecks = new recent_check_array_1.default(this.bufferLen);
        this.openStreams = [];
        this.sendMessageOnCheck = (check) => {
            this.openStreams.forEach(stream => {
                stream.write('event: new\n');
                stream.write(`data: ${JSON.stringify(check)}\n\n`);
            });
        };
        this.sendPingMessage = () => {
            this.openStreams.forEach(stream => {
                stream.write(': Ping\n\n');
            });
        };
        this.sendUpdateMessage = (data) => {
            this.openStreams.forEach(stream => {
                stream.write('event: update\n');
                stream.write(`data: ${JSON.stringify(data)}\n\n`);
            });
        };
    }
    openStream(req, res) {
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
            lodash_1.default.pull(this.openStreams, res);
            console.log('Connection closed');
            console.log(`Active connections: ${this.openStreams.length}`);
        });
    }
}
exports.RecentCheckController = RecentCheckController;
//# sourceMappingURL=recent-check.controller.js.map