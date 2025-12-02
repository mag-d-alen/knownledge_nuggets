import React from 'react';
import { useDispatch } from 'react-redux';
import { uiSlice } from '../slices';
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';
import classes from './Header.module.scss';
import { CreateNuggetForm } from '../../nugget/createNugget/CreateNuggetForm';
export const Header: React.FC = () => {
  return (
    <div className={classes.container}>
      <h3>Knowledge Nuggets</h3>
      <CreateNuggetForm />
      <DarkmodeToggle />
    </div>
  );
};
const DarkmodeToggle = () => {
  const dispatch = useDispatch();
  const toggleDarkMode = () => {
    dispatch(uiSlice.actions.toggleDarkMode());
  };

  return (
    <div className={classes.darkmodeToggleContainer}>
      <button className={classes.darkModeToggle} onClick={toggleDarkMode}>
        <img className={classes.darkModeToggleIcon} src={sun} alt='sun' />
        <img src={moon} alt='moon' className={classes.darkModeToggleIcon} />
      </button>
    </div>
  );
};
