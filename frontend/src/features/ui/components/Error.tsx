import React from 'react';
type ErrorProps = {
  text: string;
  dismissError: () => void;
};

export const Error: React.FC<ErrorProps> = ({ text, dismissError }) => {
  return (
    <div className='error'>
      <span>
        {text}
        <button className='button-cancel' onClick={dismissError}>
          𐄂
        </button>
      </span>
    </div>
  );
};
