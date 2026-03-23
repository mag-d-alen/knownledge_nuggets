import { useState } from 'react';
import { Tags, TextInput } from '../../ui';
import classes from './Nugget.module.scss';
import type { Nugget } from '../models/types';
import { DeleteNugget } from '../deleteNugget/DeleteNugget';
import { ExplainNugget } from '../explainNugget/ExplainNugget';
import Markdown from 'react-markdown';
import { useUpdateNugget } from '../api/nuggetApi';


type NuggetCardProps = {
  nugget: Nugget;
};
export const NuggetCard: React.FC<NuggetCardProps> = ({ nugget }) => {
  const [canEdit, setCanEdit] = useState<Record<string, boolean>>({});
  const { mutateAsync: updateNugget, isPending: isLoadingUpdateNugget } =
    useUpdateNugget();

  const { id, title, content, tags } = nugget;
  const toggleEdit = (key: 'title' | 'content') => {
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
    setCanEdit({ ...canEdit, [key]: false });
  };

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
          <Markdown>{content}</Markdown>
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
      <ExplainNugget nugget={nugget} />
    </div>
  );
};
