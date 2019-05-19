import { createReducer, createSelector } from "redux-starter-kit";
import { normalize, schema } from 'normalizr';
import { Character } from '../../../../../check-pvp-common/models';
import * as fromActions from '../actions';

export const name = 'playerCheck';

const character = new schema.Entity('characters');

export interface State {
    ids: string[],
    entities: {
        [id: string]: Character
    };
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    ids: [],
    entities: {},
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
    },
    [fromActions.searchSuccess.type]: (state, action) => {
        return {
            ...state,
            ...normalize(action.payload, character),
            loaded: true,
            loading: false
        }
    }
});

export const getAllEntities = createSelector(
    ['playerCheck.entities']
);

export const getAllCharacterEntities = createSelector(
    ['playerCheck.entities.characters']
);

export const getCharacterLoaded = createSelector(
    ['playerCheck.loaded']
);

export const getCharacterLoading = createSelector(
    ['playerCheck.loading']
);