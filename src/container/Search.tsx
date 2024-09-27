import { useCallback, useEffect, useReducer } from 'react';
import { useFetchResults } from './useFetchResults';
import { Pagination } from '../components/Pagination';
import { SearchInput } from '../components/SearchInput';
import { ResultsCard } from '../components/ResultsCard';
import { SortingDropdown } from '../components/SortingDropdown';
import { SortingOptions } from '../types/search';
import { Skeleton } from '../components/Skeleton';
import { initialState, searchReducer } from './searchReducer';

const RESULTS_PER_PAGE = 5;

export const Search = () => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const { query, page, sort } = state;
  const { results, loading, error } = useFetchResults(query, page, sort);
  const isLastPage = results.length < RESULTS_PER_PAGE;
  const handleQueryChange = useCallback((newQuery: string) => {
    dispatch({ type: 'SET_QUERY', payload: newQuery });
  }, []);
  const handlePageChange = useCallback((newPage: number) => {
    dispatch({ type: 'SET_PAGE', payload: newPage });
  }, []);
  const handleSortChange = useCallback((newSort: SortingOptions) => {
    dispatch({ type: 'SET_SORT', payload: newSort });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, page, sort]);

  return (
    <div className="flex-1 flex flex-col">
      <SearchInput onSearchChange={handleQueryChange} />
      <SortingDropdown onSortChange={handleSortChange} activeOption={sort} />
      {error && (
        <span>
          There was an issue fetching packages. Please try again in a bit.
        </span>
      )}
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {results.map((result) => (
            <ResultsCard key={result.name} result={result} />
          ))}
        </>
      )}
      <Pagination
        currentPage={page}
        isLastPage={isLastPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
