import axios, { AxiosPromise } from 'axios';
import { Character } from '../../../../check-pvp-common/models';

const baseUrl = 'localhost:8080';

class Api {
    private static http = axios.create({
        baseURL: baseUrl
    });

    static getCharacter(characterId: string): AxiosPromise<Character> {
        return this.get<Character>(`/character/${characterId}`);
    }

    private static get<T>(uri: string): AxiosPromise<T> {
        return this.http.get(uri, {
            transformResponse: response => response.data
        });
    }
}

export default Api;