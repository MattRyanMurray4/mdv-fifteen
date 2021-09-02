import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ShowsActions from './shows.actions';
import { ShowsEffects } from './shows.effects';

describe('ShowsEffects', () => {
  let actions: Observable<Action>;
  let effects: ShowsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ShowsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ShowsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ShowsActions.init() });

      const expected = hot('-a-|', {
        a: ShowsActions.loadShowsSuccess({ shows: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
