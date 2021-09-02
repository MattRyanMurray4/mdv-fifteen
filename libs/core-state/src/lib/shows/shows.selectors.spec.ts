import { ShowsEntity } from './shows.models';
import { showsAdapter, ShowsPartialState, initialState } from './shows.reducer';
import * as ShowsSelectors from './shows.selectors';

describe('Shows Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShowsId = (it: ShowsEntity) => it.id;
  const createShowsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ShowsEntity);

  let state: ShowsPartialState;

  beforeEach(() => {
    state = {
      shows: showsAdapter.setAll(
        [
          createShowsEntity('PRODUCT-AAA'),
          createShowsEntity('PRODUCT-BBB'),
          createShowsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Shows Selectors', () => {
    it('getAllShows() should return the list of Shows', () => {
      const results = ShowsSelectors.getAllShows(state);
      const selId = getShowsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ShowsSelectors.getSelected(state) as ShowsEntity;
      const selId = getShowsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getShowsLoaded() should return the current "loaded" status', () => {
      const result = ShowsSelectors.getShowsLoaded(state);

      expect(result).toBe(true);
    });

    it('getShowsError() should return the current "error" state', () => {
      const result = ShowsSelectors.getShowsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
