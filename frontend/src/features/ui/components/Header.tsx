import React from 'react';
import { useDispatch } from 'react-redux';
import { uiSlice } from '../slices';
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';
import classes from './Header.module.scss';
export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(uiSlice.actions.toggleDarkMode());
  };
  return (
    <div className={classes.header}>
      <h3>Knowledge Nuggets</h3>
      <button className={classes.darkModeToggle} onClick={toggleDarkMode}>
        <img className={classes.darkModeToggleIcon} src={sun} alt='sun' />
        <img src={moon} alt='moon' className={classes.darkModeToggleIcon} />
      </button>
    </div>
  );
};
