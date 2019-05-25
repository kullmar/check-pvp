"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const events_1 = __importDefault(require("events"));
const lodash_1 = __importDefault(require("lodash"));
const RecentCheckArray_1 = __importDefault(require("util/RecentCheckArray"));
let searchCount = 0;
const bufferLen = 30;
const recentChecks = new RecentCheckArray_1.default(bufferLen);
const recentCheckEmitter = new events_1.default();
const openStreams = [];
const sendMessageOnCheck = (check) => {
    openStreams.forEach(stream => {
        stream.write('event: new\n');
        stream.write(`data: ${JSON.stringify(check)}\n\n`);
    });
};
const sendPingMessage = () => {
    openStreams.forEach(stream => {
        stream.write(': Ping\n\n');
    });
};
const sendUpdateMessage = (data) => {
    openStreams.forEach(stream => {
        stream.write('event: update\n');
        stream.write(`data: ${JSON.stringify(data)}\n\n`);
    });
};
setInterval(sendPingMessage, 20000);
recentCheckEmitter.on('new', sendMessageOnCheck);
recentCheckEmitter.on('update', sendUpdateMessage);
if (!BNET_ID || !BNET_SECRET) {
    throw new Error('Environment variables not set');
}
const app = express_1.default();
const router = express_1.default.Router();
app.use('/api', router);
app.use(morgan_1.default('dev'));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
router.get('/recent-check-stream', (req, res) => {
    // SSE Setup
    console.log('New connection!');
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
    });
    res.write('event: initial\n');
    res.write(`data: ${JSON.stringify(recentChecks.getArray())}\n\n`);
    openStreams.push(res);
    console.log(`Active connections: ${openStreams.length}`);
    req.on('close', () => {
        lodash_1.default.pull(openStreams, res);
        console.log('Connection closed');
        console.log(`Active connections: ${openStreams.length}`);
    });
});
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
//# sourceMappingURL=app.js.map