import { createReducer } from "redux-starter-kit";
import * as fromActions from '../actions';

export const name = 'playerSearch';

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
    [fromActions.searchCharacter.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: true
        }
    },

    [fromActions.searchCharacterSuccess.type]: (state, action) => {
        const newSuggestions = { ...state.searchSuggestions };
        const charIds = action.payload.characters.map((char: fromActions.PlayerSearchSuggestion) => `${char.name}-${char.realm}-${char.region}`)
        newSuggestions[action.payload.searchTerm.toLowerCase()] = charIds;

        return {
            loaded: true,
            loading: false,
            searchSuggestions: newSuggestions
        };
    },

    [fromActions.searchCharacterFail.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: false
        };
    }
})