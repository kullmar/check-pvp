import { call, put, takeLatest } from "redux-saga/effects";
import Api from "../../../app/api";
import * as fromActions from "../actions";
import { PayloadAction } from "redux-starter-kit";

function* fetchCharacter(action: PayloadAction<string>) {
  try {
    const character = yield call(Api.getCharacter, action.payload);
    console.log(character);
    yield put(fromActions.searchSuccess(character.data));
  } catch (err) {
      console.log(err)
    yield put(fromActions.searchFail(err));
  }
}

export function* saga() {
  yield takeLatest(fromActions.search.type, fetchCharacter);
}
