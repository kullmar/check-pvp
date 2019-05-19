import express from 'express';
import morgan from 'morgan';
import BlizzardApi from '../blizzard-api/BlizzardApi';
import { Character, SearchHistory } from '../../../check-pvp-common/models';

require('dotenv').config();

const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;

let searchCount = 0;
const recentCheckLen = 30;
const recentChecks: SearchHistory[] = new Array(recentCheckLen);
Object.seal(recentChecks);

if (!BNET_ID || !BNET_SECRET) {
    throw new Error('Environment variables not set');
}

const api = new BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });

const app: express.Application = express();
const router = express.Router();

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

        recentChecks[searchCount++ % recentCheckLen] = {
            id: req.params.id,
            timestamp: Date.now(),
        };
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

router.get('recent-check-stream', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write(recentChecks);
    res.write('\n');


});

const getArrayProxy = () => {
    const proxy = new Proxy(recentChecks, {
        set: function(target, property: number, value) {      
          target[property] = value;
          console.log("Set %s to %o", property, value);
          return true;
        }
      });
    return proxy;
}

app.use('/api', router);
app.use(morgan('dev'));

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
