import { Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFetchResults } from '../useFetchResults';
import { mapSearchResults } from '../../utils/utils';
import { SortingOptions } from '../../types/search';

vi.mock('../../utils/utils', () => ({
  mapSearchResults: vi.fn(),
}));

describe('useFetchResults', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('starts with loading state and fetches results successfully', async () => {
    const mockApiResult = [
      {
        name: 'mocked-name',
        full_name: 'mocked-owner/mocked-name',
        repository_url: 'https://github.com/mocked-owner/mocked-name',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    const mappedResults = [
      {
        name: 'mocked-name',
        owner: 'mocked-owner',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockApiResult),
    });

    (mapSearchResults as Mock).mockReturnValue(mappedResults);

    const { result } = renderHook(() =>
      useFetchResults('mock-query', 1, 'stars'),
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.results).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toEqual(mappedResults);
    expect(result.current.error).toBeUndefined();
  });

  it('handles API errors correctly', async () => {
    (globalThis.fetch as Mock).mockRejectedValueOnce(
      new Error('Internal Server Error'),
    );

    const { result } = renderHook(() =>
      useFetchResults('mock-query', 1, 'stars'),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBeTruthy();
  });

  it('fetches initial results on first load', async () => {
    const mockApiResult = [
      {
        name: 'mocked-name',
        full_name: 'mocked-owner/mocked-name',
        repository_url: 'https://github.com/mocked-owner/mocked-name',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    const mappedResults = [
      {
        name: 'mocked-name',
        owner: 'mocked-owner',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockApiResult),
    });

    (mapSearchResults as Mock).mockReturnValue(mappedResults);

    const { result } = renderHook(() => useFetchResults('', 1, 'stars'));

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toEqual(mappedResults);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isInitialLoad.current).toBe(false);
  });

  it('fetches results with query and sort options after the initial load', async () => {
    const mockApiResult = [
      {
        name: 'mocked-name',
        full_name: 'mocked-owner/mocked-name',
        repository_url: 'https://github.com/mocked-owner/mocked-name',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    const mappedResults = [
      {
        name: 'mocked-name',
        owner: 'mocked-owner',
        stars: 100,
        description: 'A mocked repository',
        homepage: 'https://mocked-repo.com',
      },
    ];

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockApiResult),
    });

    (mapSearchResults as Mock).mockReturnValue(mappedResults);

    const { result, rerender } = renderHook(
      ({ query, page, sort }) =>
        useFetchResults(query, page, sort as SortingOptions),
      {
        initialProps: { query: '', page: 1, sort: 'stars' },
      },
    );

    await waitFor(() =>
      expect(result.current.isInitialLoad.current).toBe(false),
    );

    (globalThis.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockApiResult),
    });

    (mapSearchResults as Mock).mockReturnValue(mappedResults);

    rerender({ query: 'new-query', page: 1, sort: 'rank' });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.results).toEqual(mappedResults);
  });
});
