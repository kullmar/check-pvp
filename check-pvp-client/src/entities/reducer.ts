import { Character } from '../../../check-pvp-common/models';
import _ from 'lodash';
import createSelector from 'selectorator';
import qs from 'query-string';
import { getCharacterId } from '../util';

export const STATE_NAME = 'entities';

export interface State {
    characters: { [id: string]: Character };
}

export const initialState: State = {
    characters: {}
};

export function reducer(state = initialState, action: any) {
    if (action.payload && action.payload.entities) {
        return _.merge({}, state, action.payload.entities);
    }
    return state;
}

/* 
export const entitiesSlice = createSlice({
    slice: STATE_NAME,
    initialState,
    reducers: {
        addEntity: (state, action) => _.merge({}, state, action.payload.entities)
    }
});
 */

export const selectAllCharacterEntities = createSelector<any, { [id: string]: Character }>(
    [`${STATE_NAME}.characters`],
);

export const selectAllCharacterIds = createSelector(
    [selectAllCharacterEntities],
    entities => Object.keys(entities)
);

export const selectAllCharacters = createSelector(
    [selectAllCharacterEntities],
    entities => Object.values(entities)
);

export const selectSelectedCharacter = createSelector([
    { path: 'location.search', argIndex: 1 }, selectAllCharacterEntities
], (searchParams: any, entities: any) => {    
    const { name, realm, region } = qs.parse(searchParams);
    if (!name || !realm || !region) {
        return undefined;
    }

    return entities[getCharacterId(name, realm, region)];
});