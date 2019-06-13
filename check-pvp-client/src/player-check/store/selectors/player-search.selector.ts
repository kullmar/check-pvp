import createSelector from "selectorator";
import { State as SearchPlayerState } from '../reducers/player-search.reducer';
import { PlayerState } from "../reducers";

export const selectPlayerSearchState = createSelector(
    ['player.playerSearch']
);

export const selectPlayerSearchLoading = createSelector<PlayerState, boolean>(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.loading
);

export const selectPlayerSearchLoaded = createSelector<PlayerState, boolean>(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.loaded
);

export const selectPlayerSearchSuggestions = createSelector<PlayerState, { [searchId: string]: string[] }>(
    [selectPlayerSearchState],
    (state: SearchPlayerState) => state.searchSuggestions
);