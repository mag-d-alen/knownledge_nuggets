import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import type { CreateNugget } from '../models/types';
import { useCreateNuggetMutation } from '../api/nuggetApi';
import { uiSlice } from '../../ui/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

export const CreateNuggetForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.ui);
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [
    createNugget,
    { isLoading: isLoadingCreateNugget, isSuccess, isError },
  ] = useCreateNuggetMutation();
  useEffect(() => {
    if (isSuccess) {
      setNewNugget({
        title: '',
        content: '',
        tags: [],
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(uiSlice.actions.setIsLoading(isLoadingCreateNugget));
    (isSuccess || isError) && dispatch(uiSlice.actions.setIsLoading(false));
  }, [isLoadingCreateNugget, isSuccess, isError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNugget) {
      createNugget({
        ...newNugget,
        tags: newNugget.tags.length > 0 ? newNugget.tags[0].split(',') : [],
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        disabled={isLoading}
        placeholder='Title'
        type='text'
        value={newNugget.title}
        onChange={(e) => setNewNugget({ ...newNugget, title: e.target.value })}
      />
      <textarea
        disabled={isLoading}
        placeholder='Content'
        value={newNugget.content}
        onChange={(e) =>
          setNewNugget({ ...newNugget, content: e.target.value })
        }
      />
      <input
        disabled={isLoading}
        placeholder='tags'
        type='text'
        value={newNugget.tags?.join(', ')}
        onChange={(e) => {
          const newTag = e.target.value;
          setNewNugget({ ...newNugget, tags: [newTag] });
        }}
      />
      <Button type='submit' disabled={isLoading} onClick={handleSubmit}>
        Create Nugget
      </Button>
    </form>
  );
};
