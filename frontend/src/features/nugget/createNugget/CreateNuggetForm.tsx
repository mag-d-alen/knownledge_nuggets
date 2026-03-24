import React, { useState } from 'react';
import type { CreateNugget } from '../models/types';
import {  useVerifyNuggetWithAI } from '../api/nuggetApi';
import { Tags, TextInput, Error } from '../../ui';
import classes from './CreateNuggetForm.module.scss';
import { Loader } from '../../ui/components/Loader';
import { z } from 'zod';
import { useCreateNugget } from './hooks/useCreateNugget';

const createNuggetSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
});



export const CreateNuggetForm: React.FC = () => {
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVerification, setShowVerification] = useState(false);

  const {
    mutate: verifyNugget,
    isPending: isVerifying,
  } = useVerifyNuggetWithAI();
  const { mutate: createNugget, isPending: isCreating } = useCreateNugget();
  const isFormValid = () => {
    return (
      newNugget.title.length > 0 &&
      newNugget.content.length > 0 &&
      newNugget.tags.length > 0
    );
  };

  const resetAndCloseForm = () => {
    setNewNugget({
      title: '',
      content: '',
      tags: [],
    });
    // setIsModalOpen(false);
  };

  const handleSubmit = () => {
    createNugget(newNugget);
    resetAndCloseForm();
  };

  const handleVerifyWithAI = () => {
    setShowVerification(true);
    verifyNugget({
      title: newNugget.title,
      content: newNugget.content,
    });
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
  };

  const dismissError = () => {
    setErrors({});
  };

  return (
    <div>
      {isCreating && <Loader isFullscreen={true} />}
      {Object.keys(errors).length > 0 && (
        <Error text={Object.values(errors).join(', ')} dismissError={dismissError} />
      )}
      <div>
        <h1 className={classes.title}>Create Nugget</h1>
        <form className={classes.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <TextInput
            value={newNugget.title}
            onChange={(value) => setNewNugget({ ...newNugget, title: value })}
            isDisabled={isCreating || isVerifying}
            placeholder={'Nugget title'}
            shouldSaveOnEnter={false}
          />
          {errors.title && <p className={classes.error}>{errors.title}</p>}

          <TextInput
            value={newNugget.content}
            onChange={(value) => setNewNugget({ ...newNugget, content: value })}
            isDisabled={isCreating || isVerifying}
            placeholder={'Nugget content'}
            type={'textarea'}
            shouldSaveOnEnter={false}
          />
          {errors.content && <p className={classes.error}>{errors.content}</p>}

          <Tags
            updateTags={(newTags: string[]) => setNewNugget({ ...newNugget, tags: newTags })}
            currentTags={newNugget.tags}
            disabled={isCreating || isVerifying}
          />
          {errors.tags && <p className={classes.error}>{errors.tags}</p>}

          <FormButtons
            onSubmit={handleSubmit}
            onAskAIAssistant={handleVerifyWithAI}
            submitDisabled={isCreating}
          />
        </form>
      </div>
    </div>
  );
};

type FormButtonsProps = {
  submitDisabled: boolean;
  onAskAIAssistant: () => void;
  onSubmit: () => void;
};
const FormButtons = ({
  submitDisabled,
  onAskAIAssistant,
  onSubmit,
}: FormButtonsProps) => {
  return (
    <div className={classes.buttons}>
      <button disabled={submitDisabled} onClick={onSubmit}>
        Save
      </button>
      <button disabled={submitDisabled} onClick={onAskAIAssistant}>
        Ask AI Assistant for Feedback
      </button>
    </div>
  );
};
