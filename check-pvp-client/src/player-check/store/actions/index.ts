import { createAction } from 'redux-starter-kit';
import { Character, Region } from '../../../../../check-pvp-common/models';

export interface FetchCharacterPayload {
    name: string;
    realm: string;
    region: Region;
}

export const fetchCharacter = createAction<FetchCharacterPayload>('[Player Check] Fetch Character');
export const fetchCharacterFail = createAction<any>('[Player Check] Fetch Character Fail');
export const fetchCharacterSuccess = createAction<Character>('[Player Check] Fetch Character Success');

export const searchCharacter = createAction<string>('[Player Search] Search Character');
export const searchCharacterFail = createAction<any>('[Player Search] Search Character Fail');
export const searchCharacterSuccess = createAction<Character[]>('[Player Search] Search Character Success');