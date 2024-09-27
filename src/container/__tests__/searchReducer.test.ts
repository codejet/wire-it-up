import { searchReducer, initialState, Action } from '../searchReducer';
import { SortingOptions } from '../../types/search';

describe('searchReducer', () => {
  it('handles SET_QUERY action', () => {
    const action = { type: 'SET_QUERY', payload: 'new query' } as Action;
    const result = searchReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      query: 'new query',
      page: 1,
      sort: 'rank',
    });
  });

  it('resets page and sort to default on SET_QUERY', () => {
    const stateWithDifferentPageAndSort = {
      query: 'old query',
      page: 3,
      sort: 'stars' as SortingOptions,
    };
    const action = { type: 'SET_QUERY', payload: 'new query' } as Action;
    const result = searchReducer(stateWithDifferentPageAndSort, action);

    expect(result).toEqual({ query: 'new query', page: 1, sort: 'rank' });
  });

  it('handles SET_PAGE action', () => {
    const action = { type: 'SET_PAGE', payload: 3 } as Action;
    const result = searchReducer(initialState, action);

    expect(result.page).toBe(3);
  });

  it('handles SET_SORT action', () => {
    const action = {
      type: 'SET_SORT',
      payload: 'stars' as SortingOptions,
    } as Action;
    const result = searchReducer(initialState, action);

    expect(result.sort).toBe('stars');
  });

  it('returns the current state when an unknown action is provided', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: '',
    } as unknown as Action;
    const result = searchReducer(initialState, unknownAction);

    expect(result).toEqual(initialState);
  });
});
