import { call, put, takeLatest } from "redux-saga/effects";
import Api from "../../../app/api";
import * as fromActions from "../actions";
import { PayloadAction } from "redux-starter-kit";

function* fetchCharacter(action: PayloadAction<fromActions.FetchCharacterPayload>) {
  try {
    const character = yield call(Api.getCharacter, action.payload.name, action.payload.realm, action.payload.region);
    yield put(fromActions.fetchCharacterSuccess(character.data));
  } catch (err) {
      console.log(err)
    yield put(fromActions.fetchCharacterFail(err));
  }
}

function* fetchDbCharacter(action: PayloadAction<fromActions.FetchCharacterPayload>) {
  try {
    const character = yield call(Api.getDbCharacter, action.payload.name, action.payload.realm, action.payload.region);
    yield put(fromActions.fetchCharacterSuccess(character.data));
  } catch (err) {
      console.log(err)
    yield put(fromActions.fetchCharacterFail(err));
  }
}

export function* saga() {
  yield takeLatest(fromActions.fetchCharacter.type, fetchCharacter);
  yield takeLatest(fromActions.fetchCharacter.type, fetchDbCharacter);
}
