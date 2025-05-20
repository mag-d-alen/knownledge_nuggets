import React, { useEffect } from 'react';
import { Button } from './Button';
import { useDeleteNuggetMutation } from '../api/nuggetApi';
import type { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { uiSlice } from '../../ui/slices/uiSlice';

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const [deleteNugget, { isLoading: isLoadingNugget, isSuccess, isError }] =
    useDeleteNuggetMutation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.ui);
  useEffect(() => {
    dispatch(uiSlice.actions.setIsLoading(isLoadingNugget));
    (isSuccess || isError) && dispatch(uiSlice.actions.setIsLoading(false));
  }, [isLoadingNugget, isSuccess, isError]);

  const deleteNuggetHandler = () => {
    deleteNugget(id);
  };
  return (
    <Button disabled={isLoading} onClick={deleteNuggetHandler}>
      delete me
    </Button>
  );
};
