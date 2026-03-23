import React from 'react';
import classes from './Modal.module.scss';
import Markdown from 'react-markdown';
import { Loader } from './Loader';

type ModalProps = {
  message?: string;
  isLoading: boolean;
  loadingText: string;
  title: string;
  children?: React.ReactNode;
  trigger: React.ReactNode;
  onClose?: () => void;
  onOpen?: () => void;


};

export const Modal: React.FC<ModalProps> = ({
  onOpen,
  message,
  loadingText,
  children,
  trigger,
  title,
  isLoading,
  onClose
}) => {
  const [isOpen, setModalOpen] = React.useState(false);
  const handleClose = () => {
    setModalOpen(false);
    onClose && onClose();
  };
  const handleOpen = () => {
    setModalOpen(true);
    onOpen && onOpen();
  };
  return (
    <>
      {isOpen ? (
        <div className={classes.backdrop}>
          <div className={classes.verificationContainer} role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Header title={title} onClose={handleClose} />
            {isLoading ? (
              <Loader loadingText={loadingText} />
            ) : (
              <Body message={message}>{children}</Body>
            )}
          </div>
        </div>
      ) : (
        <button onClick={handleOpen} aria-label='Open Modal'> {trigger} </button>
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
