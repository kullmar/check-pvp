import { createReducer, createSelector } from 'redux-starter-kit';
import { loadCharacterFail, loadCharacterSuccess } from './actions';

export const STATE_NAME = 'playerCheck';

export interface State {
    isFetching: boolean;
}

export const initialState: State = {
    isFetching: false
};

export const reducer = createReducer(initialState, {
    [loadCharacterFail.type]: () => {
        return {
            isFetching: true
        };
    },
    [loadCharacterSuccess.type]: () => {
        return initialState;
    }
});

export const selectPlayerCheckState = createSelector([STATE_NAME]);
export const selectPlayerCheckIsFetching = createSelector([selectPlayerCheckState], (state) => state.isFetching);
