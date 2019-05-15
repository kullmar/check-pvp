import { createAction } from 'redux-starter-kit';

// export enum ActionTypes {
//     Search = '[Player Check] Search'
// };

export const search = createAction('[Player Check] Search');
export const searchFail = createAction('[Player Check] Search Fail');
export const searchSuccess = createAction('[Player Check] Search Success');