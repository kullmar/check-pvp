import createSagaMiddleware from 'redux-saga';
import { all } from "redux-saga/effects";
import { configureStore } from "redux-starter-kit";
import * as fromEntities from './entities/reducer';
import * as fromCheck from './player-check';
import * as fromSearch from './player-search';

function* rootSaga() {
  yield all([
    fromCheck.saga(),
    fromSearch.saga(),
  ])
}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  [fromEntities.STATE_NAME]: fromEntities.reducer,
  [fromCheck.STATE_NAME]: fromCheck.reducer,
  [fromSearch.STATE_NAME]: fromSearch.reducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
