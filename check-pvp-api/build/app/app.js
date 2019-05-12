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
var api = new BlizzardApi_1.default({ id: BNET_ID, secret: BNET_SECRET, region: 'eu' });
var app = express();
app.get("/character/:id", function (req, res) {
    var split = req.params.id.split('-');
    if (split.length !== 2) {
        res.status(400).send();
        return;
    }
    var name = split[0];
    var realm = split[1];
    api.getCharacter(name, realm).then(function (response) {
        res.send(response.data);
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
