import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import { PayloadAction } from 'redux-starter-kit';
import { searchCharacterSuccess, searchCharacterFail, searchCharacter } from './actions';
import { characterSchema } from '../models/schemas';
import { normalize } from 'normalizr';
import { Character } from '../../../check-pvp-common/models';

export function* fetchCharacterAutocomplete(
    action: PayloadAction<string>
) {
    try {
        const res = yield call(Api.searchCharacter, action.payload);
        const normalized = normalize<Character, string[]>(res.data, characterSchema);
        yield put(searchCharacterSuccess({ normalized, searchTerm: action.payload }));
    } catch (err) {
        console.log(err);
        yield put(searchCharacterFail(err));
    }
}

export function* saga() {
    yield takeLatest(searchCharacter.type, fetchCharacterAutocomplete)
}