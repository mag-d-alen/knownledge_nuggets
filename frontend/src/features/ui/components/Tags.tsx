import React, { useRef, useState } from 'react';
import classes from './Tag.module.scss';
import { Tag } from './Tag';
import { Button, TextField } from "@radix-ui/themes";


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

  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const startEditing = () => {
    setIsEditing(true);
  };
  const stopEditing = () => {
    setIsEditing(false);
    setNewTag('');
  }; 
  const toggleEdit = () => {
    isEditing ? stopEditing() : startEditing();
  };
  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (currentTags.includes(trimmed)) {
      stopEditing();
      return;
    }
    updateTags([...currentTags, trimmed]);
    stopEditing();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }

    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      handleAddTag();
    }, 1500);
  }

  const removeTag = (tag: string) => {
    updateTags(currentTags.filter((t) => t !== tag));
  };

  return (
    <div className={classes.tags}>
      {isEditing ? (
        <TextField.Root size="1"
          autoFocus
          disabled={disabled}
          value={newTag}
          placeholder="Add a tag"
          onChange={(e) => setNewTag(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      ) : (
        <>
          <Button className={classes.addTag} onClick={toggleEdit}>
            +
          </Button>
          {currentTags.length === 0 && (
            <span className={classes.addTagText}>
              Add a tag to save this nugget
            </span>
          )}
        </>
      )}
      {currentTags.length > 0 &&
        currentTags.map((tag) => (
          <Tag key={tag} tag={tag} onClick={() => removeTag(tag)} />
        ))}
    </div>
  );
};
