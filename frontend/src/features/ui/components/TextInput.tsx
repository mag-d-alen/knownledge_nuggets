import { useRef, useState } from 'react';
import { TextArea, TextField } from '@radix-ui/themes';

type TextInputProps = {
  isDisabled: boolean;
  value?: string;
  saveValue: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'textarea';
  rows?: number;
  required?: boolean;
};

export const TextInput = ({
  isDisabled,
  value,
  saveValue,
  placeholder,
  type = 'text',
  rows = 10,
  required = true,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const handleChange = (value: string) => {
    setInputValue(value);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      saveValue(value);
    }, 1000); 
  };


  return type === "textarea" ? (
    <TextArea
      size={"2"}
      radius="small"
      aria-label={placeholder}
      required={required}
      rows={rows}
      disabled={isDisabled}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
    />
  ) : (
    <TextField.Root
      size={"2"}
      radius="small"
      disabled={isDisabled}
      required={required}
      value={inputValue}
      placeholder={placeholder}
      aria-label={placeholder}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};