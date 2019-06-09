import { call, put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../../app/api';
import * as fromActions from '../actions';
import { PayloadAction } from 'redux-starter-kit';

function* fetchCharacter(
    action: PayloadAction<fromActions.FetchCharacterPayload>
) {
    try {
        const character = yield call(
            Api.getCharacter,
            action.payload.name,
            action.payload.realm,
            action.payload.region
        );
        yield put(fromActions.fetchCharacterSuccess(character.data));
    } catch (err) {
        console.log(err);
        yield put(fromActions.fetchCharacterFail(err));
    }
}

function* fetchDbCharacter(
    action: PayloadAction<fromActions.FetchCharacterPayload>
) {
    try {
        const character = yield call(
            Api.getDbCharacter,
            action.payload.name,
            action.payload.realm,
            action.payload.region
        );
        yield put(fromActions.fetchCharacterSuccess(character.data));
    } catch (err) {
        yield put(fromActions.fetchCharacterFail(err));
    }
}

function* searchCharacter(
    action: PayloadAction<string>
) {
    try {
        const characters = yield call(Api.searchCharacter, action.payload);
        yield put(fromActions.searchCharacterSuccess(characters));
    } catch (err) {
        yield put(fromActions.searchCharacterFail(err));
    }
}

export function* saga() {
    yield all([
        yield takeLatest(fromActions.fetchCharacter.type, fetchDbCharacter),
        yield takeLatest(fromActions.fetchCharacter.type, fetchCharacter),
        yield takeLatest(fromActions.searchCharacter, searchCharacter)
    ]);
}
