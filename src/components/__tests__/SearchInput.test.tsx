import { render, screen, fireEvent } from '@testing-library/react';
import { Mock } from 'vitest';
import { SearchInput } from '../SearchInput';
import debounce from 'lodash.debounce';

vi.mock('lodash.debounce');

describe('SearchInput', () => {
  let onSearchChange: Mock;

  beforeEach(() => {
    onSearchChange = vi.fn();
    (debounce as Mock).mockImplementation((fn) => fn);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the search input with the correct placeholder', () => {
    render(<SearchInput onSearchChange={onSearchChange} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'search');
    expect(inputElement).toHaveClass(
      'rounded border p-2 w-full mb-3 outline-slate-200',
    );
  });

  it('calls handler when typing into the input', () => {
    render(<SearchInput onSearchChange={onSearchChange} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    fireEvent.change(inputElement, { target: { value: 'hello' } });

    expect(onSearchChange).toHaveBeenCalledWith('hello');
  });

  it('renders with autoFocus enabled', () => {
    render(<SearchInput onSearchChange={onSearchChange} />);

    const inputElement = screen.getByPlaceholderText('Search...');

    expect(inputElement).toHaveFocus();
  });
});
