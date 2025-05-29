import React, { useEffect, useState } from 'react';
import type { CreateNugget } from '../models/types';
import { useCreateNuggetMutation } from '../api/nuggetApi';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { uiSlice, TagInput, TextInput, Error } from '../../ui';
import classes from './CreateNuggetForm.module.scss';
export const CreateNuggetForm: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.ui);
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [
    createNugget,
    { isLoading: isLoadingCreateNugget, isSuccess, isError },
  ] = useCreateNuggetMutation();

  useEffect(() => {
    dispatch(uiSlice.actions.setIsLoading(isLoadingCreateNugget));
    (isSuccess || isError) && dispatch(uiSlice.actions.setIsLoading(false));
  }, [isLoadingCreateNugget, isSuccess, isError]);

  const isFormValid = () => {
    console.log(newNugget);
    return (
      newNugget.title.length > 0 &&
      newNugget.content.length > 0 &&
      newNugget.tags.length > 0
    );
  };
  const resetForm = () => {
    setNewNugget({
      title: '',
      content: '',
      tags: [],
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      createNugget(newNugget);
      return setIsFormOpen(false);
    }
    setError('Please fill in all fields');
  };
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    resetForm();
  };
  const isValid = isFormValid();

  return (
    <>
      {error && <Error text={error} dismissError={() => setError(null)} />}
      {isFormOpen && (
        <>
          <h1 className={classes.title}>Create Nugget</h1>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextInput
              isDisabled={isLoading}
              value={newNugget.title}
              onChange={(value) => setNewNugget({ ...newNugget, title: value })}
              placeholder={'Title'}
              shouldSaveOnEnter={false}
            />
            <TextInput
              isDisabled={isLoading}
              value={newNugget.content}
              onChange={(value) =>
                setNewNugget({ ...newNugget, content: value })
              }
              placeholder={'Content'}
              type={'textarea'}
              shouldSaveOnEnter={false}
            />
            <TagInput
              disabled={isLoading}
              updateTags={(newTags: string[]) =>
                setNewNugget({ ...newNugget, tags: newTags })
              }
              currentTags={newNugget.tags || []}
            />
            <div className={classes.buttons}>
              <button type='submit' disabled={isLoading || !isValid}>
                Save
              </button>
              <button onClick={handleToggleForm}>Cancel</button>
            </div>
          </form>
        </>
      )}
      {!isFormOpen && <button onClick={handleToggleForm}>Create Nugget</button>}
    </>
  );
};
