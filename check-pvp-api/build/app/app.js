"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var BlizzardApi_1 = __importDefault(require("../blizzard-api/BlizzardApi"));
require('dotenv').config();
var BNET_ID = process.env.CLIENT_ID;
var BNET_SECRET = process.env.CLIENT_SECRET;
if (!BNET_ID || !BNET_SECRET) {
    throw new Error('Environment variables not set');
}
var api = new BlizzardApi_1.default({ id: BNET_ID, secret: BNET_SECRET });
var app = express();
app.get("/character/:id", function (req, res) {
    var nameRealm = getNameAndRealm(req.params.id);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    var name = nameRealm.name, realm = nameRealm.realm;
    api.getCharacterFull(name, realm).then(function (response) {
        res.send(response.data);
    });
});
app.get("/character/:charId/pvp-summary", function (req, res, next) {
    var nameRealm = getNameAndRealm(req.params.charId);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    var name = nameRealm.name, realm = nameRealm.realm;
    api.getPvpSummary(name, realm)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(next);
});
app.get("/character/:charId/statistics", function (req, res, next) {
    var nameRealm = getNameAndRealm(req.params.charId);
    if (!nameRealm) {
        res.status(400).send();
        return;
    }
    var name = nameRealm.name, realm = nameRealm.realm;
    api.getStatistics(name, realm)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(next);
});
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
// ================= Utilities =================
function getNameAndRealm(raw) {
    var split = raw.split('-');
    if (split.length !== 2) {
        return null;
    }
    var name = split[0];
    var realm = split[1];
    return {
        name: name,
        realm: realm,
    };
}
