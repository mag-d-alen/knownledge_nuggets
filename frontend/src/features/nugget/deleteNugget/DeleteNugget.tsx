import React from 'react';
import { useDeleteNuggetMutation } from '../api/nuggetApi';
import deleteIcon from '../../../assets/delete.svg';
import classes from './DeleteNugget.module.scss';

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const [deleteNugget, { isLoading }] = useDeleteNuggetMutation();

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <button
        className={classes.deleteButton}
        disabled={isLoading}
        onClick={(e) => handleDeleteNugget(e)}>
        <img src={deleteIcon} alt='delete' className={classes.deleteIcon} />
      </button>
    </>
  );
};
