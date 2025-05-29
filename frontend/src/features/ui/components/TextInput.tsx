import React, { useState } from 'react';

type TextInputProps = {
  isDisabled: boolean;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'textarea';
  rows?: number;
  required?: boolean;
  shouldSaveOnEnter?: boolean;
};

export const TextInput = ({
  isDisabled,
  value,
  onChange,
  placeholder,
  type = 'text',
  rows = 10,
  required = false,
  shouldSaveOnEnter = true,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!shouldSaveOnEnter) {
      return;
    }
    if (e.key === 'Enter') {
      onChange(inputValue!);
      setInputValue('');
    }
  };
  const handleChange = (value: string) => {
    setInputValue(value);
    if (!shouldSaveOnEnter) {
      setTimeout(() => {
        onChange(value);
      }, 100);
    }
  };
  return type === 'textarea' ? (
    <textarea
      required={required}
      rows={rows}
      disabled={isDisabled}
      placeholder={placeholder}
      value={inputValue}
      onKeyDown={(e) => handleKeyDown(e)}
      onChange={(e) => handleChange(e.target.value)}
    />
  ) : (
    <input
      onKeyDown={(e) => handleKeyDown(e)}
      required={required}
      disabled={isDisabled}
      placeholder={placeholder}
      type={'text'}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
