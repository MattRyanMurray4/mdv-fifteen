import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  getActionType,
  NotifyService,
  ShowsService,
} from '@tv/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import {
  loadShow,
  loadShowFailure,
  loadShowSuccess,
  loadShows,
  loadShowsFailure,
  loadShowsSuccess,
  createShow,
  createShowFailure,
  createShowSuccess,
  updateShow,
  updateShowFailure,
  updateShowSuccess,
  deleteShow,
  deleteShowFailure,
  deleteShowSuccess,
} from './shows.actions';
import * as ShowsActions from './shows.actions';
import { of } from 'rxjs';

@Injectable()
export class ShowsEffects {
  loadShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShow),
      switchMap(({ id }) =>
        this.showsService.find(id).pipe(
          map((show) => loadShowSuccess({ show })),
          catchError((error) => of(loadShowFailure({ error })))
        )
      )
    )
  );

  loadShows$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShows),
      switchMap(() =>
        this.showsService.all().pipe(
          map((shows) => loadShowsSuccess({ shows })),
          catchError((error) => of(loadShowsFailure({ error })))
        )
      )
    )
  );

  createShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createShow),
      switchMap(({ show }) =>
        this.showsService.create(show).pipe(
          map((show) => createShowSuccess({ show })),
          catchError((error) => of(createShowFailure({ error })))
        )
      )
    )
  );

  updateShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateShow),
      switchMap(({ show }) =>
        this.showsService.update(show).pipe(
          map((show) => updateShowSuccess({ show })),
          catchError((error) => of(updateShowFailure({ error })))
        )
      )
    )
  );

  deleteShow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteShow),
      switchMap(({ show }) =>
        this.showsService.delete(show.id).pipe(
          map((id) => deleteShowSuccess({ id })),
          catchError((error) => of(deleteShowFailure({ error })))
        )
      )
    )
  );

  showsSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateShowSuccess, createShowSuccess, deleteShowSuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Show ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  showsFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateShowFailure, createShowFailure, deleteShowFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Show. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private showsService: ShowsService,
    private notify: NotifyService
  ) {}
}
