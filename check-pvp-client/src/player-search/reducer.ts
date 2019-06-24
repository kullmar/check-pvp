import { createReducer, createSelector } from "redux-starter-kit";
import { searchCharacter, searchCharacterFail, searchCharacterSuccess } from "./actions";

export const STATE_NAME = 'playerSearch';

export interface State {
    loaded: boolean;
    loading: boolean;
    searchSuggestions: {
        [searchTerm: string]: string[];
    }
}

export const initialState: State = {
    loaded: false,
    loading: false,
    searchSuggestions: {}
};

export const reducer = createReducer(initialState, {
    [searchCharacter.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: true
        }
    },

    [searchCharacterSuccess.type]: (state, action) => {
        const newSuggestions = { ...state.searchSuggestions };
        const charIds = action.payload.result;
        newSuggestions[action.payload.searchTerm.toLowerCase()] = charIds;
        debugger

        return {
            loaded: true,
            loading: false,
            searchSuggestions: newSuggestions
        };
    },

    [searchCharacterFail.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: false
        };
    }
});

export const selectPlayerSearchState = createSelector(
    [STATE_NAME]
);

export const selectPlayerSearchLoading = createSelector(
    [selectPlayerSearchState],
    (state: State) => state.loading
);

export const selectPlayerSearchLoaded = createSelector(
    [selectPlayerSearchState],
    (state: State) => state.loaded
);

export const selectPlayerSearchSuggestions = createSelector(
    [selectPlayerSearchState],
    (state: State) => state.searchSuggestions
);