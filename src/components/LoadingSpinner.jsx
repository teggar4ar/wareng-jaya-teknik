import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex h-[50vh] items-center justify-center bg-paper" role="status" aria-label="Memuat halaman">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-line border-t-accent"></div>
    </div>
  );
};

export default LoadingSpinner;
