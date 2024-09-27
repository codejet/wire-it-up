import { SortingOptions } from '../types/search';

interface State {
  query: string;
  page: number;
  sort: SortingOptions;
}

export type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SORT'; payload: SortingOptions };

export const initialState: State = {
  query: '',
  page: 1,
  sort: 'rank',
};

export const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, page: 1, sort: 'rank' };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};
