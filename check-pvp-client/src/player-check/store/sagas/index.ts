import { call, put, takeLatest } from "redux-saga/effects";
import Api from "../../../app/api";
import * as fromActions from "../actions";
import { PayloadAction } from "redux-starter-kit";

function* fetchCharacter(action: PayloadAction<string>) {
  try {
    const character = yield call(Api.getCharacter, action.payload);
    yield put(fromActions.fetchCharacterSuccess(character.data));
  } catch (err) {
      console.log(err)
    yield put(fromActions.fetchCharacterFail(err));
  }
}

export function* saga() {
  yield takeLatest(fromActions.fetchCharacter.type, fetchCharacter);
}
