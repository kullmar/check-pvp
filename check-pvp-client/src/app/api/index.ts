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

    static searchCharacter(name: string): AxiosPromise<Character[]> {
        return Api.post<Character[]>('/character-search', name);
    }

    private static get<T>(uri: string): AxiosPromise<T> {
        return Api.http.get(uri);
    }

    private static post<T>(uri: string, data: any): AxiosPromise<T> {
        return Api.http.post(uri, data);
    }
}

export default Api;