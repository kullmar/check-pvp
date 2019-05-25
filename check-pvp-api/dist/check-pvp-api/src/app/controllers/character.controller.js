"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("services");
const lodash_1 = __importDefault(require("lodash"));
require('dotenv').config();
const BNET_ID = process.env.CLIENT_ID;
const BNET_SECRET = process.env.CLIENT_SECRET;
class CharacterController {
    constructor() {
        this.api = new services_1.BlizzardApi({ id: BNET_ID, secret: BNET_SECRET });
    }
    getCharacterData(req, res) {
        const nameRealm = this.getNameAndRealm(req.params.id);
        if (!nameRealm) {
            res.status(400).send();
            return;
        }
        const { name, realm } = nameRealm;
        this.api.getCharacterFull(name, realm).then((response) => {
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
            const existingIndex = lodash_1.default.findIndex(recentChecks.getArray(), r => r.id === recentCheck.id);
            recentChecks.add(recentCheck);
            if (existingIndex !== -1) {
                recentCheckEmitter.emit('update', {
                    index: existingIndex,
                    timestamp: Date.now(),
                });
            }
            else {
                recentCheckEmitter.emit('new', recentCheck);
            }
            searchCount++;
        });
    }
    getNameAndRealm(raw) {
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
}
exports.CharacterController = CharacterController;
//# sourceMappingURL=character.controller.js.map