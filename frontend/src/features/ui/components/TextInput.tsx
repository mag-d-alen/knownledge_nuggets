import React, { useEffect, useRef, useState } from 'react';
import { TextArea, TextField } from '@radix-ui/themes';

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
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (e.key === 'Enter' && inputValue !== '') {
      e.preventDefault();
      onChange(inputValue!);
      setInputValue('');
    }
    timerRef.current = setTimeout(() => {
      onChange(inputValue!);
    }, 1000);
  };

  const handleChange = (val: string) => {
    setInputValue(val);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onChange(val);
    }, 1000);

  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return type === 'textarea' ? (
    <TextArea
      size={'2'}
      radius='small'
      aria-label={placeholder}
      required={required}
      rows={rows}
      disabled={isDisabled}
      placeholder={placeholder}
      value={inputValue}
      onBlur={(e) => handleChange(e.target.value)}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}

    // className={classes.textInput}
    />
  ) : (
    <TextField.Root
      size={'2'}
      radius='small'
      disabled={isDisabled}
      required={required}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
      value={inputValue}
      placeholder={placeholder}
      aria-label={placeholder}
    />

  );
};
