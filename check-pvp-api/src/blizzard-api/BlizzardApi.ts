import axios, { AxiosResponse, AxiosPromise, AxiosInstance } from 'axios';

export type Region = 'eu' | 'us';

export interface BlizzardApiConfig {
    id: string;
    secret: string;
    region: Region;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

const defaultConfig: BlizzardApiConfig = {
    id: '',
    secret: '',
    region: 'eu'
};

export default class BlizzardApi {
    private axios: AxiosInstance;
    private config: BlizzardApiConfig = defaultConfig;
    private _token: string = '';

    constructor(config: BlizzardApiConfig) {
        this.config = {...this.config, ...config};
        this.axios = axios.create({
            baseURL: `https://${this.config.region}.api.blizzard.com`
        });
        this.authenticate().then((response: AxiosResponse<TokenResponse>) => {
            this.token = response.data.access_token;
        });
    }

    get token() {
        return this._token;
    }
    set token(newToken: string) {
        this._token = newToken;
        this.updateAxiosHeader();

        console.log(`New token set: ${newToken}`);
    }

    public getCharacter(name: string, realm: string): AxiosPromise {
        return this.axios.get(`/wow/character/${realm}/${name}`);
    }

    private authenticate(): AxiosPromise<TokenResponse> {
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

    private updateAxiosHeader(): void {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
}