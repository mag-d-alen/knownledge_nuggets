import React from 'react';
import classes from './Modal.module.scss';
import Markdown from 'react-markdown';
import { Loader } from './Loader';

type ModalProps = {
  message?: string;
  isLoading: boolean;
  onClose?: () => void;
  loadingText: string;
  title: string;
  children?: React.ReactNode;
  triggerButton: React.ReactNode;
  isOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
};

export const Modal: React.FC<ModalProps> = ({
  message,
  isLoading,
  onClose,
  loadingText,
  children,
  triggerButton,
  title,
  isOpen = false,
  setModalOpen,
}) => {
  const handleClose = () => {
    setModalOpen(false);
    onClose?.();
  };
  const handleOpen = () => {
    setModalOpen(true);
  };
  return (
    <>
      {isOpen ? (
        <>
          <button className={classes.backdrop} onClick={onClose}></button>
          <div className={classes.verificationContainer}>
            <Header title={title} onClose={handleClose} />
            {isLoading ? (
              <Loader loadingText={loadingText} />
            ) : (
              <Body message={message}>{children}</Body>
            )}
          </div>
        </>
      ) : (
        <button onClick={handleOpen}>{triggerButton}</button>
      )}
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

type BodyProps = {
  message?: string;
  children?: React.ReactNode;
};
const Body = ({ message, children }: BodyProps) => {
  return (
    <div className={classes.feedback}>
      {message && <Markdown>{message}</Markdown>}
      {children}
    </div>
  );
};
