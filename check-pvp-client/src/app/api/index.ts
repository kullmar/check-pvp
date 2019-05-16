import axios, { AxiosPromise } from 'axios';
import { Character } from '../../../../check-pvp-common/models';

const baseUrl = '/api';

class Api {
    private static http = axios.create({
        baseURL: baseUrl
    });

    static getCharacter(characterId: string): AxiosPromise<Character> {
        return Api.get<Character>(`/character/${characterId}`);
    }

    private static get<T>(uri: string): AxiosPromise<T> {
        return Api.http.get(uri, {
            transformResponse: response => response.data
        });
    }
}

export default Api;