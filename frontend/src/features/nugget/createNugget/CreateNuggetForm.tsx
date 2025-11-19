import React, { useState } from 'react';
import type { CreateNugget } from '../models/types';
import { useCreateNuggetMutation } from '../api/nuggetApi';
import { Tags, TextInput, Error } from '../../ui';
import classes from './CreateNuggetForm.module.scss';

export const CreateNuggetForm: React.FC = () => {
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createNugget, { isLoading }] = useCreateNuggetMutation();

  const isFormValid = () => {
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
  const isValid = isFormValid();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      createNugget(newNugget);
      return setIsFormOpen(false);
    }
    setError('Please fill in all fields');
  };
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
    resetForm();
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <Error text={error} dismissError={dismissError} />}
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
            <Tags
              updateTags={(newTags: string[]) =>
                setNewNugget({ ...newNugget, tags: newTags })
              }
              currentTags={newNugget.tags}
              disabled={isLoading}
            />
            <FormButtons
              submitDisabled={isLoading || !isValid}
              submitText='Save'
              handleToggleForm={handleToggleForm}
            />
          </form>
        </>
      )}
      {!isFormOpen && <button className={classes.createNuggetButton} onClick={handleToggleForm}>Create Nugget</button>}
    </>
  );
};

type FormButtonsProps = {
  submitDisabled: boolean;
  submitText: string;
  handleToggleForm: () => void;
};
const FormButtons = ({
  submitDisabled,
  handleToggleForm,
}: FormButtonsProps) => {
  return (
    <div className={classes.buttons}>
      <button type='submit' disabled={submitDisabled}>
        Save
      </button>
      <button onClick={handleToggleForm}>Cancel</button>
    </div>
  );
};
