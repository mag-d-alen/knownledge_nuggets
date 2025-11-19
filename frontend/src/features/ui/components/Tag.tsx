import React from 'react'
import classes from './Tag.module.scss';

type TagProps = {
  tag: string;
  onClick: () => void;
};
export const Tag: React.FC<TagProps> = ({ tag, onClick}: TagProps) => {
  return (
    <div className={classes.tag} key={tag}>
    <p>{tag}</p>
    <button onClick={onClick}>𐄂</button>
  </div>
  )
}
