import { createReducer } from "redux-starter-kit";
import { Character } from '../../../../../check-pvp-common/models';
import * as fromActions from '../actions';

export const name = 'playerCheck';

export interface State {
    entities: {
        [id: string]: Character
    };
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    entities:  {},
    loaded: false,
    loading: false
};

export const reducer = createReducer(initialState, {
    [fromActions.search.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: false
        }
    }
});