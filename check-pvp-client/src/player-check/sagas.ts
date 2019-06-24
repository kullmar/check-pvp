import { call, put, takeLatest, all } from 'redux-saga/effects';
import Api from '../api';
import { PayloadAction } from 'redux-starter-kit';
import { normalize } from 'normalizr';
import { characterSchema } from '../models/schemas';
import { FetchCharacterPayload, loadCharacterSuccess, loadCharacterFail } from '.';
import { loadCharacterRequest } from './actions';

export function* fetchCharacter(
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
    yield takeLatest(loadCharacterRequest.type, fetchCharacter);
}