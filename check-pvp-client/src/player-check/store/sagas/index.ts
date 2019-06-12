import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import * as fromActions from '../actions';
import * as fromCheck from './player-check.saga';
import * as fromSearch from './player-search.saga';

export function* saga() {
    yield all([
        yield takeLatest(fromActions.fetchCharacter.type, fromCheck.fetchDbCharacter),
        yield takeLatest(fromActions.fetchCharacter.type, fromCheck.fetchCharacter),
        yield takeEvery(fromActions.searchCharacter, fromSearch.searchCharacter)
    ]);
}
