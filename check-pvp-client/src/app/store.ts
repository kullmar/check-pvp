import * as fromPlayerCheck from "../player-check/store";
import { configureStore } from "redux-starter-kit";
import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    fromPlayerCheck.saga()
  ])
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  [fromPlayerCheck.name]: fromPlayerCheck.reducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
