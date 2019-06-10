import { createAction } from 'redux-starter-kit';

export interface PlayerSearchSuggestion {
    name: string;
    realm: string;
    region: string;
}

export interface Suggestions {
    characters: PlayerSearchSuggestion[];
    searchTerm: string;
}

export const searchCharacter = createAction<string>('[Player Search] Search Character');
export const searchCharacterFail = createAction<any>('[Player Search] Search Character Fail');
export const searchCharacterSuccess = createAction<Suggestions>('[Player Search] Search Character Success');