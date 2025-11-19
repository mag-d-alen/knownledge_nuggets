import React, { useState } from 'react';
import classes from './Tag.module.scss';
import { Tag } from './Tag';

type TagsProps = {
  disabled: boolean;
  updateTags: (newTag: string[]) => void;
  currentTags?: string[];
};
export const Tags: React.FC<TagsProps> = ({
  disabled = false,
  updateTags,
  currentTags = [],
}) => {
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag !== '') {
      e.preventDefault();
      updateTags(currentTags.length > 0 ? [...currentTags, newTag] : [newTag]);
      setNewTag('');
      toggleEdit();
    }
  };
  const removeTag = (tag: string) => {
    updateTags(currentTags.filter((t) => t !== tag));
  };

  return (
    <>
      {isEditing ? (
        <input
          disabled={disabled}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            addTag(e);
          }}
          placeholder='Add a tag'
        />
      ) : (
        <button onClick={toggleEdit}>Add a tag</button>
      )}

      {currentTags.length > 0 && (
        <div className={classes.tags}>
          {currentTags.map((tag) => (
            <Tag key={tag} tag={tag} onClick={() => removeTag(tag)} />
          ))}
        </div>
      )}
    </>
  );
};
