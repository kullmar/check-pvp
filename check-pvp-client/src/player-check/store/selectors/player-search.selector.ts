import createSelector from "selectorator";

export const selectSearchLoading = createSelector([
    'player.playerSearch.loading'
]);