import { takeLatest, all } from 'redux-saga/effects';
import * as fromActions from '../actions';
import * as fromCheck from './player-check.saga';
import * as fromSearch from './player-search.saga';

export function* saga() {
    yield all([
        yield takeLatest(fromActions.fetchCharacter.type, fromCheck.fetchDbCharacter),
        yield takeLatest(fromActions.fetchCharacter.type, fromCheck.fetchCharacter),
        yield takeLatest(fromActions.searchCharacter, fromSearch.searchCharacter)
    ]);
}
