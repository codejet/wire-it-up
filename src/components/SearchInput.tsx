import React from 'react';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  onSearchChange: (value: string) => void;
}

export const SearchInput = React.memo(
  ({ onSearchChange }: SearchInputProps) => {
    const debouncedOnChange = debounce(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
      },
      500,
    );

    return (
      <input
        className="rounded border-slate-300 border p-2 w-full mb-3 outline-slate-200 relative"
        placeholder="Search..."
        onChange={debouncedOnChange}
        autoComplete="off"
        type="search"
        autoFocus={true}
      />
    );
  },
);
