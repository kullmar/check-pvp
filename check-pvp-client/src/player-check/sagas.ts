import { call, put, takeLatest, all } from 'redux-saga/effects';
import Api from '../api';
import { PayloadAction } from 'redux-starter-kit';
import { normalize } from 'normalizr';
import { characterSchema } from '../models/schemas';
import { FetchCharacterPayload, fetchCharacterSuccess, fetchCharacterFail, fetchCharacter } from './actions';

export function* fetchCharacterRequest(
    action: PayloadAction<FetchCharacterPayload>
) {
    try {
        const response = yield call(
            Api.getCharacter,
            action.payload.name,
            action.payload.realm,
            action.payload.region
        );
        const normalized = normalize(response.data, characterSchema);
        yield put(fetchCharacterSuccess(normalized));
    } catch (err) {
        yield put(fetchCharacterFail(err));
    }
}

export function* fetchDbCharacter(
    action: PayloadAction<FetchCharacterPayload>
) {
    try {
        const character = yield call(
            Api.getDbCharacter,
            action.payload.name,
            action.payload.realm,
            action.payload.region
        );
        yield put(fetchCharacterSuccess(character.data));
    } catch (err) {
        yield put(fetchCharacterFail(err));
    }
}

export function* saga() {
    yield all([
        yield takeLatest(fetchCharacter.type, fetchDbCharacter),
        yield takeLatest(fetchCharacter.type, fetchCharacter),
    ]);
}