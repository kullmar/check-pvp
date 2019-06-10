import { createAction } from "redux-starter-kit";
import { Region, Character } from "../../../../../check-pvp-common/models";

export interface FetchCharacterPayload {
    name: string;
    realm: string;
    region: Region;
}

export const fetchCharacter = createAction<FetchCharacterPayload>('[Player Check] Fetch Character');
export const fetchCharacterFail = createAction<any>('[Player Check] Fetch Character Fail');
export const fetchCharacterSuccess = createAction<Character>('[Player Check] Fetch Character Success');