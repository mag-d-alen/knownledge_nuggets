import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (data: any) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...props}>
      {children}
    </button>
  );
};
