
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Markdown from 'react-markdown';
import { Loader } from './Loader';
import classes from './Modal.module.scss';

type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  message?: string;
  isLoading: boolean;
  loadingText: string;
  title: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  message,
  loadingText,
  children,
  trigger,
  title,
  isLoading,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.backdrop}>
          <Dialog.Content className={classes.content}>
            <div className={classes.header}>
              <Dialog.Title className={classes.title}>{title}</Dialog.Title>
              <Dialog.Close className={classes.closeButton}>x</Dialog.Close>
            </div>
            {isLoading ? (
              <Loader loadingText={loadingText} />
            ) : (
              <>
                {message && <Markdown>{message}</Markdown>}
                {children}
              </>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};