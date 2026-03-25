import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import type { CreateNugget } from '../models/types';
import { Tags, TextInput } from '../../ui';
import { Button } from '@radix-ui/themes';
import classes from './CreateNuggetForm.module.scss';
import { useCreateNugget } from './hooks/useCreateNugget';
import { Toast } from '../../ui/components/Toast';
import { AIFeedbackCollapsible } from './AIFeedbackCollapsible';

const emptyNugget: CreateNugget = {
  title: '',
  content: '',
  tags: [],
};
const emptyError = {
  title: false,
  content: false,
  tags: false,
};

type CreateNuggetFormProps = {
  onSuccess: () => void;
};

export const CreateNuggetForm = ({ onSuccess }: CreateNuggetFormProps) => {
  const [newNugget, setNewNugget] = useState<CreateNugget>(emptyNugget);
  const [error, setError] = useState(emptyError);
  const [toast, setToast] = useState<{
    open: boolean;
    text: string;
    variant: 'success' | 'error';
  }>({ open: false, text: 'Nugget added successfully', variant: 'success' });

  const { mutate: createNugget, isPending, isError, isSuccess } = useCreateNugget();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (!isValid) return;
    createNugget(newNugget, {
      onSuccess: () => {
        resetForm();
        onSuccess();
      },
    });
  };

  const validateInputs = () => {
    let isValid = true;
    if (newNugget.title === '') {
      setError((prev) => ({ ...prev, title: true }));
      isValid = false;
    }
    if (newNugget.content === '') {
      setError((prev) => ({ ...prev, content: true }));
      isValid = false;
    }
    if (newNugget.tags.length === 0) {
      setError((prev) => ({ ...prev, tags: true }));
      isValid = false;
    }
    return isValid;
  };

  const resetForm = () => {
    setNewNugget(emptyNugget);
    setError(emptyError);
  };

  const handleCancel = () => {
    resetForm();
    onSuccess();
  };

  const handleTagsChange = (newTags: string[]) => {
    setNewNugget((prev) => ({ ...prev, tags: newTags }));
    setError((prev) => ({ ...prev, tags: newTags.length === 0 }));
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({
        open: true,
        text: 'Nugget created successfully',
        variant: 'success',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setToast({
        open: true,
        text: 'Error creating nugget',
        variant: 'error',
      });
    }
  }, [isError]);



  return <>
    <Toast text={toast.text} variant={toast.variant} open={toast.open} onOpenChange={() => setToast({ ...toast, open: false })} />
    <Form.Root className={classes.form} onSubmit={handleSubmit}>
      <FormField
        name='title'
        errorMessage='Title is required'
        isError={error.title}>
        <TextInput
          value={newNugget.title}
          onChange={(value) =>
            setNewNugget((prev) => ({ ...prev, title: value }))
          }
          isDisabled={isPending}
          placeholder='Nugget title'
          shouldSaveOnEnter={false}
        />
      </FormField>
      <FormField
        name='content'
        errorMessage='Content is required'
        isError={error.content}>
        <TextInput
          value={newNugget.content}
          onChange={(value) =>
            setNewNugget((prev) => ({ ...prev, content: value }))
          }
          isDisabled={isPending}
          placeholder='Nugget content'
          type='textarea'
          shouldSaveOnEnter={false}
        />
      </FormField>
      <FormField
        name='tags'
        isError={error.tags}
        errorMessage='At least one tag is required'>
        <Tags
          updateTags={handleTagsChange}
          currentTags={newNugget.tags}
          disabled={isPending}
        />
      </FormField>
      <AIFeedbackCollapsible disabled={isPending} nugget={newNugget} />
      <div className={classes.buttons}>
        <Button className={classes.cancelButton} type='reset' onClick={handleCancel}>
          Cancel
        </Button>
        <Form.Submit asChild>
          <Button className={classes.saveButton} type='submit'>Save</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  </>

};

type FormFieldProps = {
  name: string;
  errorMessage: string;
  children: React.ReactNode;
  isError: boolean;
};

const FormField = ({
  name,
  isError,
  errorMessage,
  children,
}: FormFieldProps) => (
  <Form.Field name={name} serverInvalid={isError}>
    <Form.Label className={classes.label}>{name}</Form.Label>
    <Form.Control asChild>{children}</Form.Control>
    {isError && (
      <Form.Message className={classes.error}>{errorMessage}</Form.Message>
    )}
  </Form.Field>
);
