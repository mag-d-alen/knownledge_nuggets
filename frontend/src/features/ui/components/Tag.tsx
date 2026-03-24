import React from 'react'
import classes from './Tag.module.scss';
import { Button } from '@radix-ui/themes';


type TagProps = {
  tag: string;
  onClick: () => void;
};
export const Tag: React.FC<TagProps> = ({ tag, onClick }: TagProps) => {
  return (
    <div className={classes.tag} key={tag}>
      <p>{tag}</p>
      <Button className={classes.closeButton} onClick={onClick}>𐄂</Button>
    </div>
  )
}
