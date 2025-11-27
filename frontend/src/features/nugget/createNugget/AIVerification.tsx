import React from 'react';
import classes from './AIVerification.module.scss';
import Markdown from 'react-markdown';

type AIVerificationProps = {
  feedback: string;
  isLoading: boolean;
  onClose: () => void;
};

export const AIVerification: React.FC<AIVerificationProps> = ({
  feedback,
  isLoading,
  onClose,
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
            <div className={classes.spinner}></div>
            <p>
              Hi, I'm your assistant.
              <br /> Let me think how to polish up your entry...
            </p>
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
          <Markdown>{feedback}</Markdown>
        </div>
      </div>
    </>
  );
};
