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
  const loadingTitle = 'Message from your assistant';
  const loadedTitle = "Your Assistant's Feedback";

  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.verificationContainer}>
        <Header
          title={isLoading ? loadingTitle : loadedTitle}
          onClose={onClose}
        />
        {isLoading ? (
          <LoadingBody loadingText={loadingText} />
        ) : (
          <LoadedBody message={message} />
        )}
      </div>
    </>
  );
};

type HeaderProps = {
  title: string;
  onClose: () => void;
};
const Header = ({ title, onClose }: HeaderProps) => {
  return (
    <div className={classes.header}>
      <h3 className={classes.title}>{title}</h3>
      <button onClick={onClose} className={classes.closeButton}>
        ×
      </button>
    </div>
  );
};

type LoadingBodyProps = {
  loadingText: string;
};
const LoadingBody = ({ loadingText }: LoadingBodyProps) => {
  return (
    <div className={classes.loading}>
      <h3>Hi, I'm your assistant 🤗</h3>
      <Loader loadingText={loadingText} />
    </div>
  );
};

type LoadedBodyProps = {
  message: string;
};
const LoadedBody = ({ message }: LoadedBodyProps) => {
  return (
    <div className={classes.feedback}>
      <Markdown>{message}</Markdown>
    </div>
  );
};
