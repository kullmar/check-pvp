import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { FetchCharacterPayload, loadCharacterFail, loadCharacterSuccess } from '.';
import Api from '../api';
import { characterSchema } from '../models/schemas';
import { loadCharacterRequest } from './actions';

export function* fetchCharacter(
    action: PayloadAction<FetchCharacterPayload>
) {
    try {
        const { name, realm, region } = action.payload;
        const response = yield call(
            Api.getCharacter,
            name,
            realm,
            region
        );
        const normalized = normalize(response.data, characterSchema);
        yield put(loadCharacterSuccess(normalized));
    } catch (err) {
        yield put(loadCharacterFail(err));
    }
}

export function* fetchDbCharacter(
    action: PayloadAction<FetchCharacterPayload>
) {
    try {
        const response = yield call(
            Api.getDbCharacter,
            action.payload.name,
            action.payload.realm,
            action.payload.region
        );
        const normalized = normalize(response.data, characterSchema);
        yield put(loadCharacterSuccess(normalized));
    } catch (err) {
        yield put(loadCharacterFail(err));
    }
}

export function* saga() {
    yield takeEvery(loadCharacterRequest.type, fetchDbCharacter);
    yield takeEvery(loadCharacterRequest.type, fetchCharacter);
}