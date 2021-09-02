import { ActionReducerMap } from '@ngrx/store';
import {
  showsReducer,
  ShowsState,
  SHOWS_FEATURE_KEY,
} from './shows/shows.reducer';

export interface AppState {
  [SHOWS_FEATURE_KEY]: ShowsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [SHOWS_FEATURE_KEY]: showsReducer,
};
