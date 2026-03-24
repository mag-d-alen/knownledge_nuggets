import React from 'react';
import { useDeleteNugget } from '../api/nuggetApi';
import deleteIcon from '../../../assets/delete.svg';
import classes from './DeleteNugget.module.scss';
import { Loader } from '../../ui/components/Loader';
import { Button } from '@radix-ui/themes'

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const { mutate: deleteNugget, isPending: isDeleting } = useDeleteNugget();

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  const darkMode = document.body.classList.contains('darkMode');

  const deleteIconClassName = darkMode
    ? classes.darkModeIcon
    : classes.deleteIcon

  return (
    <Button
      type='button'
      aria-label='Delete Nugget'
      onClick={handleDeleteNugget}
      className={classes.deleteButton}
      disabled={isDeleting}>
      {isDeleting ? <Loader /> : <img src={deleteIcon} alt='Delete' className={deleteIconClassName} />}
    </Button>
  );
};
