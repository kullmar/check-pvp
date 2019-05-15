import * as fromPlayerCheck from "../player-check/store";
import { configureStore } from "redux-starter-kit";

export const rootReducer = {
  [fromPlayerCheck.name]: fromPlayerCheck.reducer
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
