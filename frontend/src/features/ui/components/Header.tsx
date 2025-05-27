import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSlice } from '../slices';
import type { RootState } from '../../../app/store';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(uiSlice.actions.toggleDarkMode());
  };
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
      }}>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};
