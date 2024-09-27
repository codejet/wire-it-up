import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  beforeEach(() => {
    globalThis.scrollTo = vi.fn();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('renders the header component', () => {
    render(<App />);

    expect(screen.getByAltText('Bower Logo')).toBeInTheDocument();
  });

  it('renders the sidebar component', () => {
    render(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the search component', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders the footer component', () => {
    render(<App />);

    expect(screen.getByText('Help improve these docs.')).toBeInTheDocument();
  });
});
