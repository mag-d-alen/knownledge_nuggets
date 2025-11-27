import React from 'react';
import classes from './AIResponseModal.module.scss';
import Markdown from 'react-markdown';
import { Loader } from '../../ui/components/Loader';

type AIResponseModalProps = {
  message: string;
  isLoading: boolean;
  onClose: () => void;
  loadingText: string;
};

export const AIResponseModal: React.FC<AIResponseModalProps> = ({
  message,
  isLoading,
  onClose,
  loadingText,
}) => {
  if (isLoading) {
    return (
      <>
        <div className={classes.backdrop} onClick={onClose}></div>
        <div className={classes.verificationContainer}>
          <div className={classes.header}>
            <h3>Message from your assistant</h3>
            <button onClick={onClose} className={classes.closeButton}>
              ×
            </button>
          </div>
          <div className={classes.loading}>
            <h3>
              Hi, I'm your assistant 🤗
              <Loader loadingText={loadingText} />
            </h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.verificationContainer}>
        <div className={classes.header}>
          <h3>Your Assistant's Feedback</h3>
          <button onClick={onClose} className={classes.closeButton}>
            ×
          </button>
        </div>
        <div className={classes.feedback}>
          <Markdown>{message}</Markdown>
        </div>
      </div>
    </>
  );
};
