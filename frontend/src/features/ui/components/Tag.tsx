import React from "react";
import classes from "./Tag.module.scss";
import x from "../../../assets/x.svg";

type TagProps = {
  tag: string;
  onClick: () => void;
};
export const Tag: React.FC<TagProps> = ({ tag, onClick }: TagProps) => {
  return (
    <div className={classes.tag} key={tag}>
      <p>{tag}</p>
      <button className={classes.closeButton} onClick={onClick}>
        <img src={x} alt="Remove tag" />
      </button>
    </div>
  );
};
