import React, { useState } from 'react';
import classes from './Tag.module.scss';

type TagInputProps = {
  disabled: boolean;
  updateTags: (newTag: string[]) => void;
  currentTags?: string[];
};
export const TagInput: React.FC<TagInputProps> = ({
  disabled = false,
  updateTags,
  currentTags = [],
}) => {
  const [newTag, setNewTag] = useState('');
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag !== '') {
      e.preventDefault();
      updateTags(currentTags.length > 0 ? [...currentTags, newTag] : [newTag]);
      setNewTag('');
    }
  };
  const removeTag = (tag: string) => {
    updateTags(currentTags.filter((t) => t !== tag));
  };

  return (
    <div>
      <input
        required
        disabled={disabled}
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={(e) => addTag(e)}
        placeholder='Add a tag'
      />
      {currentTags.map((tag) => (
        <button
          key={tag}
          className={classes.tag}
          onClick={() => removeTag(tag)}>
          <p>{tag}</p>
          <span>𐄂</span>
        </button>
      ))}
    </div>
  );
};
