import axios, { AxiosPromise } from 'axios';
import { Character, Region } from '../../../../check-pvp-common/models';

const baseUrl = '/api';

class Api {
    private static http = axios.create({
        baseURL: baseUrl
    });

    static getCharacter(name: string, realm: string, region: Region): AxiosPromise<Character> {
        return Api.get<Character>(`/character?name=${name}&realm=${realm}&region=${region}`);
    }

    static getDbCharacter(name: string, realm: string, region: Region): AxiosPromise<Character> {
        return Api.get<Character>(`/db/character?name=${name}&realm=${realm}&region=${region}`);
    }

    private static get<T>(uri: string): AxiosPromise<T> {
        return Api.http.get(uri);
    }
}

export default Api;