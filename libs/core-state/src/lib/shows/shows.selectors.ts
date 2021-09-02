import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyShow, Show } from '@tv/api-interfaces';
import { SHOWS_FEATURE_KEY, ShowsState, showsAdapter } from './shows.reducer';

// Lookup the 'Shows' feature state managed by NgRx
export const getShowsState =
  createFeatureSelector<ShowsState>(SHOWS_FEATURE_KEY);

const { selectAll, selectEntities } = showsAdapter.getSelectors();

export const getShowsLoaded = createSelector(
  getShowsState,
  (state: ShowsState) => state.loaded
);

export const getShowsError = createSelector(
  getShowsState,
  (state: ShowsState) => state.error
);

export const getAllShows = createSelector(getShowsState, (state: ShowsState) =>
  selectAll(state)
);

export const getShowsEntities = createSelector(
  getShowsState,
  (state: ShowsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getShowsState,
  (state: ShowsState) => state.selectedId
);

export const getSelected = createSelector(
  getShowsEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyShow) as Show
);
