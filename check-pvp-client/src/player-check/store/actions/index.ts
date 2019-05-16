import { createAction } from 'redux-starter-kit';
import { Character } from '../../../../../check-pvp-common/models';

export const search = createAction<string>('[Player Check] Search');
export const searchFail = createAction<any>('[Player Check] Search Fail');
export const searchSuccess = createAction<Character>('[Player Check] Search Success');