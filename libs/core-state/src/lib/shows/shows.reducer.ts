import { Show } from '@tv/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ShowsActions from './shows.actions';

export const SHOWS_FEATURE_KEY = 'shows';

export interface ShowsAction extends Action {
  error: any;
}

export interface ShowsState extends EntityState<Show> {
  selectedId?: string | number; // which Shows record has been selected
  loaded: boolean; // has the Shows list been loaded
  error?: string | null; // last known error (if any)
}

export interface ShowsPartialState {
  readonly [SHOWS_FEATURE_KEY]: ShowsState;
}

export const showsAdapter: EntityAdapter<Show> = createEntityAdapter<Show>();

export const initialState: ShowsState = showsAdapter.getInitialState({
  loaded: false,
});

const setLoading = (state: ShowsState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: ShowsState, { error }: ShowsAction) => ({
  ...state,
  error,
});

const _showsReducer = createReducer(
  initialState,
  on(
    ShowsActions.loadShow,
    ShowsActions.loadShows,
    ShowsActions.createShow,
    ShowsActions.updateShow,
    ShowsActions.deleteShow,
    setLoading
  ),
  on(
    ShowsActions.loadShowFailure,
    ShowsActions.loadShowsFailure,
    ShowsActions.createShowFailure,
    ShowsActions.updateShowFailure,
    ShowsActions.deleteShowFailure,
    setFailure
  ),
  on(ShowsActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(ShowsActions.loadShowsSuccess, (state, { shows }) =>
    showsAdapter.setAll(shows, { ...state, loaded: true })
  ),
  on(ShowsActions.loadShowsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ShowsActions.loadShowSuccess, (state, { show }) =>
    showsAdapter.upsertOne(show, { ...state, loaded: true })
  ),
  on(ShowsActions.selectShow, (state, { showId }) => ({
    ...state,
    selectedId: showId,
  })),
  on(ShowsActions.createShowSuccess, (state, { show }) =>
    showsAdapter.addOne(show, { ...state, loaded: true })
  ),
  on(ShowsActions.updateShowSuccess, (state, { show: { id, ...restShow } }) =>
    showsAdapter.updateOne(
      { id, changes: { ...restShow } },
      { ...state, loaded: true }
    )
  ),
  on(ShowsActions.deleteShowSuccess, (state, { id }) =>
    showsAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function showsReducer(state: ShowsState | undefined, action: Action) {
  return _showsReducer(state, action);
}
