
import React from 'react';
import { Theme } from '@radix-ui/themes';
import { useDarkMode } from './DarkModeProvider';
import "@radix-ui/themes/styles.css";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useDarkMode();
  return (
    <Theme
      appearance={darkMode ? 'dark' : 'light'}
      accentColor="amber"
      grayColor="sand"
      radius="large"
      scaling="95%"
    >
      {children}
    </Theme>
  );
}

