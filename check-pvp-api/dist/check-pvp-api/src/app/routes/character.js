"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BlizzardApi_1 = __importDefault(require("blizzard-api/BlizzardApi"));
const router = express_1.Router();
const api = new BlizzardApi_1.default({ id: BNET_ID, secret: BNET_SECRET });
router.get(`/character/:id`, (req, res) => {
    const nameRealm = getNameAndRealm(req.params.id);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    const { name, realm } = nameRealm;
    api.getCharacterFull(name, realm).then(response => {
        const { data } = response;
        const characterDto = {
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
        const recentCheck = {
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
// ================= Utilities =================
function getNameAndRealm(raw) {
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
//# sourceMappingURL=character.js.map