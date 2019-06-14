import { createReducer } from 'redux-starter-kit';
import { normalize, schema } from 'normalizr';
import { Character } from '../../../../../check-pvp-common/models';
import * as fromActions from '../actions';
import _ from 'lodash';
import { any } from 'prop-types';

export const name = 'playerCheck';

const characterSchema = new schema.Entity('characters', undefined, {
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
            loading: true,
        };
    },
    [fromActions.fetchCharacterSuccess.type]: (state, action) => {
        const { entities } = normalize<{ characters: { [id: string]: Character }}, any>(action.payload, characterSchema);

        return {
            entities: _.merge({}, state.entities, entities.characters),
            loaded: true,
            loading: false,
        };
    },
    [fromActions.searchCharacterSuccess.type]: (state, action) => {
        const { entities } = normalize(action.payload.characters, [characterSchema]);
        const updatedEntities = _.merge({}, state.entities, entities.characters)

        return {
            ...state,
            entities: updatedEntities
        };
    }
});

