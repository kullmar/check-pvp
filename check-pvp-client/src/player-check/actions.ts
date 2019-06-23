import { createAction } from "redux-starter-kit";
import { Character, Region } from "../../../check-pvp-common/models";
import { NormalizedSchema } from "normalizr";

export interface FetchCharacterPayload {
    name: string;
    realm: string;
    region: Region;
}

export const fetchCharacter = createAction<FetchCharacterPayload>('[Player Check] Fetch Character');
export const fetchCharacterFail = createAction<any>('[Player Check] Fetch Character Fail');
export const fetchCharacterSuccess = createAction<NormalizedSchema<Character, string[]>>('[Player Check] Fetch Character Success');