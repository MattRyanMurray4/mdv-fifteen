import { Show } from '@tv/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Shows Page] Init');

// all

export const loadShows = createAction('[Shows] Load All Shows');

export const loadShowsSuccess = createAction(
  '[Shows] Load Shows Success',
  props<{ shows: Show[] }>()
);

export const loadShowsFailure = createAction(
  '[Shows] Load Shows Failure',
  props<{ error: any }>()
);

// singular

export const loadShow = createAction(
  '[Show] Load A Show',
  props<{ id: string }>()
);

export const loadShowSuccess = createAction(
  '[Show] Loaded Show Success',
  props<{ show: Show }>()
);

export const loadShowFailure = createAction(
  '[Show] Loaded Show Failure',
  props<{ error: any }>()
);

// select

export const selectShow = createAction(
  '[Show] Selected A Show',
  props<{ showId: string }>()
);

// create

export const createShow = createAction(
  '[Show] Create A Show',
  props<{ show: Show }>()
);

export const createShowSuccess = createAction(
  '[Show] Created Show Success',
  props<{ show: Show }>()
);

export const createShowFailure = createAction(
  '[Show] Created Show Failure',
  props<{ error: any }>()
);

// update

export const updateShow = createAction(
  '[Show] Update A Show',
  props<{ show: Show }>()
);

export const updateShowSuccess = createAction(
  '[Show] UpdatedShow Success',
  props<{ show: Show }>()
);

export const updateShowFailure = createAction(
  '[Show] Updated Show Failure',
  props<{ error: any }>()
);

// delete

export const deleteShow = createAction(
  '[Show] Delete A Show',
  props<{ show: Show }>()
);

export const deleteShowSuccess = createAction(
  '[Show] Deleted Show Success',
  props<{ id: string }>()
);

export const deleteShowFailure = createAction(
  '[Show] Deleted Show Failure',
  props<{ error: any }>()
);
