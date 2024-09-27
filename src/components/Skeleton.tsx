export const Skeleton = () => {
  return (
    <div
      className="animate-pulse space-y-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading content..."
      data-testid="skeleton"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  );
};
