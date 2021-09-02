import { Action } from '@ngrx/store';

import * as ShowsActions from './shows.actions';
import { ShowsEntity } from './shows.models';
import { State, initialState, reducer } from './shows.reducer';

describe('Shows Reducer', () => {
  const createShowsEntity = (id: string, name = ''): ShowsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Shows actions', () => {
    it('loadShowsSuccess should return the list of known Shows', () => {
      const shows = [
        createShowsEntity('PRODUCT-AAA'),
        createShowsEntity('PRODUCT-zzz'),
      ];
      const action = ShowsActions.loadShowsSuccess({ shows });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
