import React, { useEffect, useState } from 'react';
import type { CreateNugget } from '../models/types';
import { useCreateNuggetMutation } from '../api/nuggetApi';
import { uiSlice } from '../../ui/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { TagInput, Error } from '../../ui';
export const CreateNuggetForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.ui);
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);

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

  const validateForm = (nugget: CreateNugget) => {
    return (
      nugget.title.length > 0 &&
      nugget.content.length > 0 &&
      nugget.tags.length > 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm(newNugget);
    if (isValid) {
      return createNugget(newNugget);
    }
    setError('Please fill in all fields');
  };
  return (
    <>
      {error && <Error text={error} dismissError={() => setError(null)} />}
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          required
          disabled={isLoading}
          placeholder='Title'
          type='text'
          value={newNugget.title}
          onChange={(e) =>
            setNewNugget({ ...newNugget, title: e.target.value })
          }
        />
        <textarea
          required
          disabled={isLoading}
          placeholder='Content'
          value={newNugget.content}
          onChange={(e) =>
            setNewNugget({ ...newNugget, content: e.target.value })
          }
        />
        <TagInput
          disabled={isLoading}
          updateTags={(newTags: string[]) =>
            setNewNugget({ ...newNugget, tags: newTags })
          }
          currentTags={newNugget.tags || []}
        />
        <button type='submit' disabled={isLoading} onClick={handleSubmit}>
          Create Nugget
        </button>
      </form>
    </>
  );
};
