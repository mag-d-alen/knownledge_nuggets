import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import type { CreateNugget } from '../models/types';
import { useVerifyNuggetWithAI } from '../api/nuggetApi';
import { Tags, TextInput } from '../../ui';
import { Button } from '@radix-ui/themes';
import classes from './CreateNuggetForm.module.scss';
import { Loader } from '../../ui/components/Loader';
import { useCreateNugget } from './hooks/useCreateNugget';
import { Collapse } from '../../ui/components/Collapse';

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

  const { mutate: createNugget, isPending } = useCreateNugget();
  const {
    mutate: verifyNugget,
    isPending: isVerifying,
    data: AIFeedback,
  } = useVerifyNuggetWithAI();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateInputs();
    if (!isValid || !verifyNugget) return;
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

  const isDisabled = isPending || isVerifying;
  const collapseDisabled = newNugget.title === '' || newNugget.content === '';

  return (
    <div>
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
            isDisabled={isDisabled}
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
            isDisabled={isDisabled}
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
            disabled={isDisabled}
          />
        </FormField>
        {isVerifying ? (
          <Loader />
        ) : (
          <Collapse
            isOpen={!!AIFeedback}
            disabled={collapseDisabled}
            trigger={
              <Button
                type='button'
                onClick={() =>
                  !collapseDisabled && !isVerifying && !AIFeedback && verifyNugget(newNugget)
                }>
                AI Feedback
              </Button>
            }>
            {AIFeedback ? AIFeedback.feedback : undefined}
          </Collapse>
        )}
        <Button type='reset' onClick={handleCancel}>
          Cancel
        </Button>
        <Form.Submit asChild>
          <Button type='submit'>Save</Button>
        </Form.Submit>
      </Form.Root>
    </div>
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
  <Form.Field name={name} serverInvalid={isError}>
    <Form.Label className={classes.label}>{name}</Form.Label>
    <Form.Control asChild>{children}</Form.Control>
    {isError && (
      <Form.Message className={classes.error}>{errorMessage}</Form.Message>
    )}
  </Form.Field>
);
