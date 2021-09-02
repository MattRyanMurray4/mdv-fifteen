import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as ShowsActions from './shows.actions';
import { ShowsEffects } from './shows.effects';
import { ShowsFacade } from './shows.facade';
import { ShowsEntity } from './shows.models';
import {
  SHOWS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './shows.reducer';
import * as ShowsSelectors from './shows.selectors';

interface TestSchema {
  shows: State;
}

describe('ShowsFacade', () => {
  let facade: ShowsFacade;
  let store: Store<TestSchema>;
  const createShowsEntity = (id: string, name = ''): ShowsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SHOWS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ShowsEffects]),
        ],
        providers: [ShowsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ShowsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allShows$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allShows$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadShowsSuccess` to manually update list
     */
    it('allShows$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allShows$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ShowsActions.loadShowsSuccess({
          shows: [createShowsEntity('AAA'), createShowsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allShows$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
