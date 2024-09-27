import React from 'react';
import { SortingOptions } from '../types/search';

interface SortingDropdownProps {
  onSortChange: (sort: SortingOptions) => void;
  activeOption: SortingOptions;
}

export const SortingDropdown = React.memo(
  ({ onSortChange, activeOption }: SortingDropdownProps) => (
    <select
      value={activeOption}
      className="rounded border-r-8 border-transparent pl-2 py-2 mb-3 lg:ml-auto outline outline-slate-200 cursor-pointer"
      onChange={(e) => onSortChange(e.target.value as SortingOptions)}
    >
      <option value="rank">Sort by: Popularity</option>
      <option value="stars">Sort by: Stars</option>
    </select>
  ),
);
