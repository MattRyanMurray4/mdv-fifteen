import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Show } from '@tv/api-interfaces';
import * as ShowsActions from './shows.actions';
import * as ShowsSelectors from './shows.selectors';

@Injectable()
export class ShowsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ShowsSelectors.getShowsLoaded));
  allShows$ = this.store.pipe(select(ShowsSelectors.getAllShows));
  selectedShows$ = this.store.pipe(select(ShowsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(ShowsActions.init());
  }

  loadShows() {
    return this.store.dispatch(ShowsActions.loadShows());
  }

  loadShow(show: Show) {
    return this.store.dispatch(ShowsActions.loadShow(show));
  }

  selectShow(showId: string) {
    return this.store.dispatch(ShowsActions.selectShow({ showId }));
  }

  createShow(show: Show) {
    return this.store.dispatch(ShowsActions.createShow({ show }));
  }

  updateShow(show: Show) {
    return this.store.dispatch(ShowsActions.updateShow({ show }));
  }

  deleteShow(show: Show) {
    return this.store.dispatch(ShowsActions.deleteShow({ show }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
