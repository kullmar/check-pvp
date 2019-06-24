import { createAction } from "redux-starter-kit";
import { Character, Region } from "../../../check-pvp-common/models";
import { NormalizedSchema } from "normalizr";

export interface FetchCharacterPayload {
    name: string;
    realm: string;
    region: Region;
}

export const loadCharacterRequest = createAction<FetchCharacterPayload>('[Player Check] Load Character Request');
export const loadCharacterFail = createAction<any>('[Player Check] Load Character Fail');
export const loadCharacterSuccess = createAction<NormalizedSchema<Character, string[]>>('[Player Check] Load Character Success');
