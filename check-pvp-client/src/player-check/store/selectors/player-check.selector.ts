import createSelector from "selectorator";

export const selectAllCharacterEntities = createSelector([
    'player.playerCheck.entities',
]);

export const selectAllCharacterIds = createSelector(
    [selectAllCharacterEntities],
    entities => Object.keys(entities)
);

export const selectAllCharacters = createSelector(
    [selectAllCharacterEntities],
    entities => Object.values(entities)
);

export const selectCharacterLoaded = createSelector(['playerCheck.loaded']);

export const selectCharacterLoading = createSelector(['playerCheck.loading']);