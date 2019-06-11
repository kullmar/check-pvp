import { call, put } from 'redux-saga/effects';
import Api from '../../../app/api';
import * as fromActions from '../actions';
import { PayloadAction } from 'redux-starter-kit';

export function* searchCharacter(
    action: PayloadAction<string>
) {
    try {
        const res = yield call(Api.searchCharacter, action.payload);
        yield put(fromActions.searchCharacterSuccess({ characters: res.data, searchTerm: action.payload }));
    } catch (err) {
        console.log(err);
        yield put(fromActions.searchCharacterFail(err));
    }
}