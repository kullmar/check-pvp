"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var defaultConfig = {
    id: '',
    secret: '',
    region: 'eu'
};
var BlizzardApi = /** @class */ (function () {
    function BlizzardApi(config) {
        var _this = this;
        this.config = defaultConfig;
        this._token = '';
        this.config = __assign({}, this.config, config);
        this.axios = axios_1.default.create({
            baseURL: "https://" + this.config.region + ".api.blizzard.com",
            timeout: 10000
        });
        this.authenticate().then(function (response) {
            _this.token = response.data.access_token;
        });
    }
    Object.defineProperty(BlizzardApi.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (newToken) {
            this._token = newToken;
            this.updateAxiosHeader();
            console.log("New token set: " + newToken);
        },
        enumerable: true,
        configurable: true
    });
    BlizzardApi.prototype.getCharacter = function (name, realm) {
        return this.axios.get("/wow/character/" + realm + "/" + name);
    };
    BlizzardApi.prototype.getCharacterFull = function (name, realm) {
        return this.axios.get("/wow/character/" + realm + "/" + name + "?fields=pvp,statistics,achievements,guild");
    };
    BlizzardApi.prototype.getPvpSummary = function (name, realm) {
        return this.axios.get("/wow/character/" + realm + "/" + name + "?fields=pvp");
    };
    BlizzardApi.prototype.getStatistics = function (name, realm) {
        return this.axios.get("/wow/character/" + realm + "/" + name + "?fields=statistics");
    };
    BlizzardApi.prototype.getAvatar = function (path) {
        return this.axios.get("https://render-" + this.config.region + ".worldofwarcraft.com/character/" + path);
    };
    BlizzardApi.prototype.getPortraitImage = function (path) {
        var correctedPath = path.replace('avatar', 'main');
        return this.axios.get("https://render-" + this.config.region + ".worldofwarcraft.com/character/" + correctedPath);
    };
    BlizzardApi.prototype.authenticate = function () {
        return this.axios.get("https://" + this.config.region + ".battle.net/oauth/token", {
            auth: {
                username: this.config.id,
                password: this.config.secret,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
    };
    BlizzardApi.prototype.updateAxiosHeader = function () {
        this.axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
    };
    return BlizzardApi;
}());
exports.default = BlizzardApi;
