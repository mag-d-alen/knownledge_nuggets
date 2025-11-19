import React from 'react';
import { useDeleteNuggetMutation } from '../api/nuggetApi';

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const [deleteNugget, { isLoading }] = useDeleteNuggetMutation();

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <button disabled={isLoading} onClick={(e) => handleDeleteNugget(e)}>
        delete me
      </button>
    </>
  );
};
