import React, { useEffect, useState } from 'react';
import {
  Control,
  Field,
  Label,
  Message,
  Root,
  Submit,
} from '@radix-ui/react-form';
import type { CreateNugget } from '../models/types';
import { Button } from '@radix-ui/themes';
import classes from './CreateNuggetForm.module.scss';
import { useCreateNugget } from './hooks/useCreateNugget';
import { Toast } from '../../ui/components/Toast';
import { AIFeedbackCollapsible } from './AIFeedbackCollapsible';
import { Tags } from '../../ui/components/Tags';
import { TextInput } from '../../ui/components/TextInput';

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

  const {
    mutate: createNugget,
    isPending,
    isError,
    isSuccess,
  } = useCreateNugget();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNugget(newNugget, {
      onSuccess: () => {
        resetForm();
        onSuccess();
      },
    });
  };

  useEffect(() => {
    setError({
      title: newNugget.title.trim() === '',
      content: newNugget.content.trim() === '',
      tags: newNugget.tags.length === 0,
    });
  }, [newNugget.content, newNugget.title, newNugget.tags]);

  const resetForm = () => {
    setNewNugget(emptyNugget);
    setError(emptyError);
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

  return (
    <>
      <Toast
        text={toast.text}
        variant={toast.variant}
        open={toast.open}
        onOpenChange={() => setToast({ ...toast, open: false })}
      />
      <Root className={classes.form} onSubmit={handleSubmit}>
        <FormField
          name='title'
          errorMessage='Title is required'
          isError={error.title}>
          <TextInput
            value={newNugget.title}
            saveValue={(value) =>
              setNewNugget((prev) => ({ ...prev, title: value }))
            }
            isDisabled={isPending}
            placeholder='Nugget title'
          />
        </FormField>
        <FormField
          name='content'
          errorMessage='Content is required'
          isError={error.content}>
          <TextInput
            value={newNugget.content}
            saveValue={(value) =>
              setNewNugget((prev) => ({ ...prev, content: value }))
            }
            isDisabled={isPending}
            placeholder='Nugget content'
            type='textarea'
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
        <AIFeedbackCollapsible
          disabled={isPending || !newNugget.content || !newNugget.title}
          nugget={newNugget}
        />

        <Submit asChild>
          <Button className={classes.saveButton} type='submit'>
            Save
          </Button>
        </Submit>
      </Root>
    </>
  );
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
  <Field name={name} serverInvalid={isError}>
    <Label className={classes.label}>{name}</Label>
    <Control asChild>{children}</Control>
    {isError && <Message className={classes.error}>{errorMessage}</Message>}
  </Field>
);
