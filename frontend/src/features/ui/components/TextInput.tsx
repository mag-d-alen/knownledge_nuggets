import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextArea, TextField } from "@radix-ui/themes";

type TextInputProps = {
  isDisabled: boolean;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "textarea";
  rows?: number;
  required?: boolean;
};

export const TextInput = ({
  isDisabled,
  value,
  onChange,
  placeholder,
  type = "text",
  rows = 10,
  required = true,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const saveValue = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onChange(value);
    },
    [onChange],
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // e.preventDefault();
    if (e.key === "Enter" && inputValue !== "") {
      saveValue(inputValue!);
      setInputValue("");
    }
  };

  const handleChange = (value: string) => {
    setInputValue(value);
    // timerRef.current = setTimeout(() => {
    //   onChange(inputValue!);
    // }, 10000);
  };

  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      if (
        textareaRef.current &&
        !textareaRef.current.contains(e.target as Node)
      ) {
        saveValue(inputValue ?? "");
      }
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        saveValue(inputValue ?? "");
      }
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
    };
  }, [inputValue, saveValue]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

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
      onBlur={(e) => handleChange(e.target.value)}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={(e) => handleKeyDown(e)}
      ref={textareaRef}
    />
  ) : (
    <TextField.Root
      ref={inputRef}
      size={"2"}
      radius="small"
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
