import React from 'react';

interface PaginationProps {
  currentPage: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = React.memo(
  ({ currentPage, isLastPage, onPageChange }: PaginationProps) => {
    return (
      <nav
        className="flex justify-center mt-6"
        aria-label="Pagination navigation"
      >
        <button
          className="px-4 py-2 border border-slate-300 mr-2 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous results"
        >
          ❮
        </button>
        <span className="self-center">{currentPage}</span>
        <button
          className="px-4 py-2 border border-slate-300 ml-2 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next results"
        >
          ❯
        </button>
      </nav>
    );
  },
);
