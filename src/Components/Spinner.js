import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-[5px]'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${
          sizeClasses[size]
        } border-gray-400 dark:border-gray-600`}
      />
    </div>
  );
};

export default Spinner;