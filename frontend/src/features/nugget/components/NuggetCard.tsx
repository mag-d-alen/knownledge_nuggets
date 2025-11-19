import { useEffect, useState } from 'react';
import { DeleteNugget } from '.';
import { Tags, TextInput } from '../../ui';
import classes from './Nugget.module.scss';
import { useUpdateNuggetMutation } from '../api/nuggetApi';
import type { Nugget } from '../models/types';

type NuggetCardProps = {
  nugget: Nugget;
};
export const NuggetCard: React.FC<NuggetCardProps> = ({ nugget }) => {
  const [
    updateNugget,
    { isLoading: isLoadingUpdateNugget, isSuccess: isSuccessUpdateNugget },
  ] = useUpdateNuggetMutation();
  const [canEdit, setCanEdit] = useState<Record<string, boolean>>({});

  const { id, title, content, tags } = nugget;
  const toggleEdit = (key: 'title' | 'content' | 'tags') => {
    setCanEdit({ ...canEdit, [key]: !canEdit[key] });
  };

  const saveNugget = ({
    key,
    value,
  }: {
    key: 'title' | 'content' | 'tags';
    value: string | string[];
  }) => {
    if (key === 'tags') {
      updateNugget({ ...nugget, tags: value as string[] });
    } else {
      updateNugget({ ...nugget, [key]: value as string });
    }
  };

  useEffect(() => {
    isSuccessUpdateNugget && setCanEdit({});
  }, [isSuccessUpdateNugget]);

  return (
    <div key={id} className={classes.card}>
      {canEdit.title ? (
        <TextInput
          value={title}
          onChange={(value) => saveNugget({ key: 'title', value })}
          placeholder={'Title'}
          type={'text'}
          isDisabled={isLoadingUpdateNugget}
        />
      ) : (
        <div className={classes.title} onClick={() => toggleEdit('title')}>
          {title} <DeleteNugget id={id} />
        </div>
      )}
      {canEdit.content ? (
        <TextInput
          value={content}
          onChange={(value) => saveNugget({ key: 'content', value })}
          placeholder={'Content'}
          type={'textarea'}
          isDisabled={isLoadingUpdateNugget}
        />
      ) : (
        <div className={classes.content} onClick={() => toggleEdit('content')}>
          {content}
        </div>
      )}
      <div className={classes.tags}>
        {tags?.length > 0 && (
          <Tags
            updateTags={(newTags: string[]) =>
              saveNugget({ key: 'tags', value: newTags })
            }
            currentTags={tags}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
};
