import React, { useState } from 'react';
import type { CreateNugget } from '../models/types';
import {
  useCreateNuggetMutation,
  useVerifyNuggetWithAIMutation,
} from '../api/nuggetApi';
import { Tags, TextInput, Error } from '../../ui';
import { AIVerification } from '../components/AIVerification';
import classes from './CreateNuggetForm.module.scss';
import { Loader } from '../../ui/components/Loader';

export const CreateNuggetForm: React.FC = () => {
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showVerificationButton, setShowVerificationButton] = useState(true);
  const [showVerification, setShowVerification] = useState(false);

  const [createNugget, { isLoading }] = useCreateNuggetMutation();
  const [verifyNugget, { isLoading: isVerifying, data: verificationData }] =
    useVerifyNuggetWithAIMutation();

  const isFormValid = () => {
    return (
      newNugget.title.length > 0 &&
      newNugget.content.length > 0 &&
      newNugget.tags.length > 0
    );
  };
  const resetAndCloseForm = () => {
    setIsFormOpen(false);
    setNewNugget({
      title: '',
      content: '',
      tags: [],
    });
    setShowVerificationButton(true);
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      createNugget(newNugget);
      resetAndCloseForm();
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleVerifyWithAI = () => {
    setShowVerification(true);
    setShowVerificationButton(false);
    verifyNugget({
      title: newNugget.title,
      content: newNugget.content,
    });
    setNewNugget(newNugget);
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
    setShowVerificationButton(false);
  };

  const handleDismissVerificationOption = () => {
    setShowVerificationButton(false);
  };

  const handleToggleForm = () => {
    if (isFormOpen) {
      resetAndCloseForm();
      return dismissError();
    }
    setIsFormOpen(true);
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error text={error} dismissError={dismissError} />}
      {showVerification && (
        <AIVerification
          feedback={verificationData?.feedback || ''}
          isLoading={isVerifying}
          onClose={handleCloseVerification}
        />
      )}
      {isFormOpen && (
        <>
          <h1 className={classes.title}>Create Nugget</h1>
          <form className={classes.form}>
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
          </form>
          <FormButtons
            onSubmit={
              showVerificationButton ? handleVerifyWithAI : handleSubmit
            }
            onCancel={
              showVerificationButton
                ? handleDismissVerificationOption
                : handleToggleForm
            }
            submitDisabled={isLoading}
            submitText={
              showVerificationButton ? 'Ask AI Assistant for Feedback' : 'Save'
            }
            cancelText={
              showVerificationButton ? 'Close' : 'Dismiss the feedback'
            }
          />
        </>
      )}
      {!isFormOpen && (
        <button
          className={classes.createNuggetButton}
          onClick={handleToggleForm}>
          Create Nugget
        </button>
      )}
    </>
  );
};

type FormButtonsProps = {
  submitDisabled: boolean;
  submitText: string;
  cancelText: string;
  onSubmit: () => void;
  onCancel: () => void;
};
const FormButtons = ({
  submitDisabled,
  submitText,
  cancelText,
  onSubmit,
  onCancel,
}: FormButtonsProps) => {
  return (
    <div className={classes.buttons}>
      <button disabled={submitDisabled} onClick={onSubmit}>
        {submitText}
      </button>
      <button onClick={onCancel}>{cancelText}</button>
    </div>
  );
};
