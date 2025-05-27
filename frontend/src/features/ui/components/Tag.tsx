import React from 'react'
import classes from './Tag.module.scss';

type TagProps = {
  tag: string;
};
export const Tag: React.FC<TagProps> = ({ tag }) => {
  return (
    <div className={classes.tag}>
      <p>{tag}</p>
    </div>
  )
}
