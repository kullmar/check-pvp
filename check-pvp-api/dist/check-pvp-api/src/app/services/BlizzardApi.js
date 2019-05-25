"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const defaultConfig = {
    id: '',
    secret: '',
    region: 'eu'
};
class BlizzardApi {
    constructor(config) {
        this.config = defaultConfig;
        this._token = '';
        this.config = Object.assign({}, this.config, config);
        this.axios = axios_1.default.create({
            baseURL: `https://${this.config.region}.api.blizzard.com`,
            timeout: 10000
        });
        this.authenticate().then((response) => {
            this.token = response.data.access_token;
        });
    }
    get token() {
        return this._token;
    }
    set token(newToken) {
        this._token = newToken;
        this.updateAxiosHeader();
        console.log(`New token set: ${newToken}`);
    }
    getCharacter(name, realm) {
        return this.axios.get(`/wow/character/${realm}/${name}`);
    }
    getCharacterFull(name, realm) {
        return this.axios.get(`/wow/character/${realm}/${name}?fields=pvp,statistics,achievements,guild`);
    }
    getPvpSummary(name, realm) {
        return this.axios.get(`/wow/character/${realm}/${name}?fields=pvp`);
    }
    getStatistics(name, realm) {
        return this.axios.get(`/wow/character/${realm}/${name}?fields=statistics`);
    }
    getAvatar(path) {
        return this.axios.get(`https://render-${this.config.region}.worldofwarcraft.com/character/${path}`);
    }
    getPortraitImage(path) {
        const correctedPath = path.replace('avatar', 'main');
        return this.axios.get(`https://render-${this.config.region}.worldofwarcraft.com/character/${correctedPath}`);
    }
    authenticate() {
        return this.axios.get(`https://${this.config.region}.battle.net/oauth/token`, {
            auth: {
                username: this.config.id,
                password: this.config.secret,
            },
            params: {
                grant_type: 'client_credentials',
            },
        });
    }
    updateAxiosHeader() {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
}
exports.BlizzardApi = BlizzardApi;
//# sourceMappingURL=BlizzardApi.js.map