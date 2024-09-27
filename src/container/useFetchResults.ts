import { useState, useEffect, useRef } from 'react';
import { SearchResult } from '../types/search';
import { mapSearchResults } from '../utils/utils';

// Note: API key borrowed from bower.io :p
const API_KEY = '782c0bcca2235968b49e9826e2f787da';

export const useFetchResults = (query: string, page: number, sort: string) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const url = `https://libraries.io/api/search?api_key=${API_KEY}&per_page=5${isInitialLoad.current ? '&platforms=Bower' : `&q=${query}&sort=${sort}&page=${page}`}`;
        const response = await fetch(url);
        const data = await response.json();

        setResults(mapSearchResults(data));
      } catch (error: unknown) {
        setError(error as Error);
      } finally {
        setLoading(false);

        if (isInitialLoad.current) isInitialLoad.current = false;
      }
    };

    fetchResults();
  }, [query, page, sort]);

  return { results, loading, isInitialLoad, error };
};
