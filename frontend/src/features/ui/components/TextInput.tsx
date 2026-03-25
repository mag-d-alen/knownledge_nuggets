import React, { useEffect, useRef, useState } from "react";
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
  required = false,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const saveValue = (value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onChange(value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (e.key === "Enter" && inputValue !== "") {
      e.preventDefault();
      saveValue(inputValue!);
      setInputValue("");
    }
    if (e.key === "Escape") {
      setInputValue("");
    }
    timerRef.current = setTimeout(() => {
      onChange(inputValue!);
    }, 1000);
  };

  const handleChange = (value: string) => {
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onChange(value);
    }, 1000);
  };
  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
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
  }, [inputValue]);

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
    />
  ) : (
    <TextField.Root
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
