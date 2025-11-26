import React from 'react';
import { useDeleteNuggetMutation } from '../api/nuggetApi';
import deleteIcon from '../../../assets/delete.svg';
import classes from './DeleteNugget.module.scss';
import { Loader } from '../../ui/components/Loader';

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const [deleteNugget, { isLoading }] = useDeleteNuggetMutation();

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  return (
    <>
      {isLoading && <Loader />}
      <button
        className={classes.deleteButton}
        disabled={isLoading}
        onClick={(e) => handleDeleteNugget(e)}>
        <img src={deleteIcon} alt='delete' className={classes.deleteIcon} />
      </button>
    </>
  );
};
