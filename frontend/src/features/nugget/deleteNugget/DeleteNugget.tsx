import React from 'react';
import { useDeleteNuggetMutation } from '../api/nuggetApi';
import deleteIcon from '../../../assets/delete.svg';
import classes from './DeleteNugget.module.scss';
import { Loader } from '../../ui/components/Loader';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const [deleteNugget, { isLoading }] = useDeleteNuggetMutation();
  const isDarkMode = useSelector((state: RootState) => state.ui.darkMode);

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  const deleteIconClassName = isDarkMode
    ? classes.darkModeIcon
    : classes.deleteIcon;

  return (
    <>
      {isLoading && <Loader />}
      <button
        className={classes.deleteButton}
        disabled={isLoading}
        onClick={(e) => handleDeleteNugget(e)}>
        <img src={deleteIcon} alt='delete' className={deleteIconClassName} />
      </button>
    </>
  );
};
