import { createReducer, createSelector } from 'redux-starter-kit';
import { fetchCharacter, fetchCharacterSuccess } from './actions';

export const STATE_NAME = 'playerCheck';

export interface State {
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    loaded: false,
    loading: false
};

export const reducer = createReducer(initialState, {
    [fetchCharacter.type]: () => {
        return {
            loaded: false,
            loading: true,
        };
    },
    [fetchCharacterSuccess.type]: () => {
        return {
            loaded: true,
            loading: false,
        };
    }
});

export const selectCharacterLoaded = createSelector(['playerCheck.loaded']);

export const selectCharacterLoading = createSelector(['playerCheck.loading']);
