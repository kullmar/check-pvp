import express from 'express';
import morgan from 'morgan';
import EventEmitter from 'events';
import _ from 'lodash';

import BlizzardApi from '../blizzard-api/BlizzardApi';
import { Character, SearchHistory } from '../../../check-pvp-common/models';
import RecentCheckArray from '../util/RecentCheckArray';

require('dotenv').config();

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;

let searchCount = 0;
const bufferLen = 30;
const recentChecks = new RecentCheckArray(bufferLen);

const recentCheckEmitter = new EventEmitter();
const openStreams: any[] = [];
const sendMessageOnCheck = (check: SearchHistory) => {
    openStreams.forEach(stream => {
        stream.write('event: new\n');
        stream.write(`data: ${JSON.stringify(check)}\n\n`);
    });
};
const sendPingMessage = () => {
    openStreams.forEach(stream => {
        stream.write(': Ping\n\n');
    });
}
interface UpdateMessage {
    index: number;
    timestamp: number;
}
const sendUpdateMessage = (data: UpdateMessage) => {
    openStreams.forEach(stream => {
        stream.write('event: update\n');
        stream.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}
setInterval(sendPingMessage, 20000);
recentCheckEmitter.on('new', sendMessageOnCheck);
recentCheckEmitter.on('update', sendUpdateMessage);

if (!BNET_ID || !BNET_SECRET) {
    throw new Error('Environment variables not set');
}

const api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

const app: express.Application = express();
const router = express.Router();

app.use('/api', router);
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

router.get(`/character/:id`, (req, res) => {
    const nameRealm = getNameAndRealm(req.params.id);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    const { name, realm } = nameRealm;

    api.getCharacterFull(name, realm).then(response => {
        const { data } = response;
        const characterDto: Character = {
            id: req.params.id,
            avatarUri: data.thumbnail,
            name: data.name,
            realm: data.realm,
            region: 'eu',
            guild: data.guild.name,
            achievementPoints: data.achievementPoints,
            pvpStats: {
                v2: {
                    currentRating: 0,
                    maxRating: 0,
                    wins: 0,
                    losses: 0,
                },
                v3: {
                    currentRating: 0,
                    maxRating: 0,
                    wins: 0,
                    losses: 0,
                },
            },
        };
        res.send(characterDto);

        const recentCheck: SearchHistory = {
            id: req.params.id,
            maxRating: 2789,
            timestamp: Date.now(),
        };
        const existingIndex = _.findIndex(recentChecks.getArray(), (r) => r.id === recentCheck.id);
        recentChecks.add(recentCheck);
        if (existingIndex !== -1) {
            recentCheckEmitter.emit('update', { index: existingIndex, timestamp: Date.now() });
        }
        else {
            recentCheckEmitter.emit('new', recentCheck);
        }
        searchCount++;
    });
});

router.get(`/character/:charId/pvp-summary`, (req, res, next) => {
    const nameRealm = getNameAndRealm(req.params.charId);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    const { name, realm } = nameRealm;

    api.getPvpSummary(name, realm)
        .then(response => {
            res.send(response.data);
        })
        .catch(next);
});

router.get(`/character/:charId/statistics`, (req, res, next) => {
    const nameRealm = getNameAndRealm(req.params.charId);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    const { name, realm } = nameRealm;

    api.getStatistics(name, realm)
        .then(response => {
            res.send(response.data);
        })
        .catch(next);
});

router.get('/recent-check-stream', (req, res: any) => {
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
        _.pull(openStreams, res);
        console.log('Connection closed');
        console.log(`Active connections: ${openStreams.length}`);
    });
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});

// ================= Utilities =================
function getNameAndRealm(raw: string): { name: string; realm: string } | null {
    const split = raw.split('-');
    if (split.length !== 2) {
        return null;
    }
    const name = split[0];
    const realm = split[1];

    return {
        name,
        realm,
    };
}
