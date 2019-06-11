import createSelector from "selectorator";
import { State as SearchPlayerState } from '../reducers/player-search.reducer';

export const selectPlayerSearchState = createSelector(
    ['player.playerSearch']
);

export const selectPlayerSearchLoading = createSelector(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.loading
);

export const selectPlayerSearchLoaded = createSelector(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.loaded
);

export const selectPlayerSearchSuggestions = createSelector(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.searchSuggestions
);