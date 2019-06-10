import { createReducer } from 'redux-starter-kit';
import { normalize, schema } from 'normalizr';
import { Character } from '../../../../../check-pvp-common/models';
import * as fromActions from '../actions';

export const name = 'playerCheck';

const character = new schema.Entity('characters', undefined, {
    idAttribute: (character: Character) =>
        `${character.name}-${character.realm}-${character.region}`
});

export interface State {
    entities: {
        [id: string]: Character;
    };
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    entities: {},
    loaded: false,
    loading: false,
};

export const reducer = createReducer(initialState, {
    [fromActions.fetchCharacter.type]: (state, action) => {
        return {
            ...state,
            loaded: false,
            loading: false,
        };
    },
    [fromActions.fetchCharacterSuccess.type]: (state, action) => {
        const { entities } = normalize(action.payload, character);

        return {
            ...state,
            entities: {
                ...state.entities,
                ...entities.characters,
            },
            loaded: true,
            loading: false,
        };
    },
});


