import { combineReducers } from "redux";
import * as fromCheck from './player-check.reducer';
import * as fromSearch from './player-search.reducer';

export const reducer = combineReducers({
    [fromCheck.name]: fromCheck.reducer,
    [fromSearch.name]: fromSearch.reducer
});