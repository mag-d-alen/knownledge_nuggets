import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSlice } from '../slices';
import type { RootState } from '../../../app/store';
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';
import classes from './Header.module.scss';
export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(uiSlice.actions.toggleDarkMode());
  };
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  return (
    <div className={classes.header}>
      <h3>Knowledge Nuggets</h3>
      <button
        className={
          classes.darkModeToggle +
          ' ' +
          (darkMode ? classes.darkMode : classes.lightMode)
        }
        onClick={toggleDarkMode}>
        <img className={classes.darkModeToggleIcon} src={sun} alt='sun' />
        <img src={moon} alt='moon' className={classes.darkModeToggleIcon} />
      </button>
    </div>
  );
};
