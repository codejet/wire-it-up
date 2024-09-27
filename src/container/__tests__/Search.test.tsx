import { render, screen, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';
import { Search } from '../Search';
import { useFetchResults } from '../useFetchResults';

vi.mock('../useFetchResults');

describe('Search Component', () => {
  const mockResults = [
    {
      name: 'Test Package',
      owner: 'test-owner',
      stars: 100,
      description: 'This is a test package',
      homepage: 'https://test-package.com',
    },
  ];

  beforeEach(() => {
    globalThis.scrollTo = vi.fn();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('renders search input and sorting dropdown', () => {
    (useFetchResults as Mock).mockReturnValue({
      results: [],
      loading: false,
      error: null,
    });

    render(<Search />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Sort by: Popularity')).toBeInTheDocument();
  });

  it('renders results after successful fetch', async () => {
    (useFetchResults as Mock).mockReturnValue({
      results: mockResults,
      loading: false,
      error: null,
    });

    render(<Search />);

    await waitFor(() => {
      expect(screen.getByText('Test Package')).toBeInTheDocument();
      expect(screen.getByText('test-owner')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  it('renders loading skeleton when loading', () => {
    (useFetchResults as Mock).mockReturnValue({
      results: [],
      loading: true,
      error: null,
    });

    render(<Search />);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders error message on fetch failure', () => {
    (useFetchResults as Mock).mockReturnValue({
      results: [],
      loading: false,
      error: new Error('Fetch failed'),
    });

    render(<Search />);

    expect(
      screen.getByText(
        /There was an issue fetching packages. Please try again/i,
      ),
    ).toBeInTheDocument();
  });
});
