import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortingDropdown } from '../SortingDropdown';

describe('SortingDropdown', () => {
  it('renders with the correct default selected option', () => {
    const mockOnSortChange = vi.fn();
    render(
      <SortingDropdown onSortChange={mockOnSortChange} activeOption="rank" />,
    );

    const rankOption = screen.getByRole('option', {
      name: 'Sort by: Popularity',
    }) as HTMLOptionElement;
    const starsOption = screen.getByRole('option', {
      name: 'Sort by: Stars',
    }) as HTMLOptionElement;

    expect(rankOption.selected).toBe(true);
    expect(starsOption.selected).toBe(false);
  });

  it('calls handler with the correct value when a new option is selected', async () => {
    const mockOnSortChange = vi.fn();
    render(
      <SortingDropdown onSortChange={mockOnSortChange} activeOption="rank" />,
    );

    const dropdown = screen.getByRole('combobox');

    await userEvent.selectOptions(dropdown, 'stars');

    expect(mockOnSortChange).toHaveBeenCalledWith('stars');
  });

  it('renders the correct option as selected based on activeOption prop', () => {
    const mockOnSortChange = vi.fn();
    render(
      <SortingDropdown onSortChange={mockOnSortChange} activeOption="stars" />,
    );

    const rankOption = screen.getByRole('option', {
      name: 'Sort by: Popularity',
    }) as HTMLOptionElement;
    const starsOption = screen.getByRole('option', {
      name: 'Sort by: Stars',
    }) as HTMLOptionElement;

    expect(rankOption.selected).toBe(false);
    expect(starsOption.selected).toBe(true);
  });
});
