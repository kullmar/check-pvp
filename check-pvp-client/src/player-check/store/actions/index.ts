import { createAction } from 'redux-starter-kit';
import { Character } from '../../../../../check-pvp-common/models';

export const fetchCharacter = createAction<string>('[Player Check] Fetch Character');
export const fetchCharacterFail = createAction<any>('[Player Check] Fetch Character Fail');
export const fetchCharacterSuccess = createAction<Character>('[Player Check] Fetch Character Success');