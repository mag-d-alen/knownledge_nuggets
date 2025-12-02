import React, { useState } from 'react';
import type { CreateNugget } from '../models/types';
import {
  useCreateNuggetMutation,
  useVerifyNuggetWithAIMutation,
} from '../api/nuggetApi';
import { Tags, TextInput, Error } from '../../ui';
import classes from './CreateNuggetForm.module.scss';
import { Loader } from '../../ui/components/Loader';
import { Modal } from '../../ui/components/Modal';

export const CreateNuggetForm: React.FC = () => {
  const [newNugget, setNewNugget] = useState<CreateNugget>({
    title: '',
    content: '',
    tags: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setNewNugget({
      title: '',
      content: '',
      tags: [],
    });
    setIsModalOpen(false);
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
    verifyNugget({
      title: newNugget.title,
      content: newNugget.content,
    });
    setNewNugget(newNugget);
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div>
      {isLoading && <Loader isFullscreen={true} />}
      {error && <Error text={error} dismissError={dismissError} />}

      <Modal
        isOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        loadingText='Let me think how to polish up your entry...'
        title="Your Assistant's Feedback"
        message={
          verificationData?.feedback && showVerification
            ? verificationData?.feedback
            : ''
        }
        isLoading={isVerifying}
        onClose={resetAndCloseForm}
        triggerButton={'Create Nugget'}>
        {showVerification ? (
          <button onClick={handleCloseVerification}>Back to form</button>
        ) : (
          <div>
            <h1 className={classes.title}>Create Nugget</h1>
            <form className={classes.form}>
              <TextInput
                isDisabled={isLoading}
                value={newNugget.title}
                onChange={(value) =>
                  setNewNugget({ ...newNugget, title: value })
                }
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
              onSubmit={handleSubmit}
              onAskAIAssistant={handleVerifyWithAI}
              submitDisabled={isLoading || !isFormValid()}
            />
          </div>
        )}
      </Modal>
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
