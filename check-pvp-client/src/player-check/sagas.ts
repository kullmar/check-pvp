import { normalize } from 'normalizr';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from 'redux-starter-kit';
import { FetchCharacterPayload, loadCharacterFail, loadCharacterSuccess } from '.';
import Api from '../api';
import { characterSchema } from '../models/schemas';
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