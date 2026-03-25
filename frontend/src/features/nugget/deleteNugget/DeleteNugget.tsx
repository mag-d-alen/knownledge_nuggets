import React from "react";
import deleteIcon from "../../../assets/delete.svg";
import classes from "./DeleteNugget.module.scss";
import { Loader } from "../../ui/components/Loader";
import { Tooltip } from "../../ui/components/Tooltip";
import { useDarkMode } from "../../../providers/DarkModeProvider";
import { useDeleteNugget } from "./hooks/useDeleteNugget";

export const DeleteNugget: React.FC<{ id: string }> = ({ id }) => {
  const { mutate: deleteNugget, isPending: isDeleting } = useDeleteNugget();

  const handleDeleteNugget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteNugget(id);
  };

  const { darkMode } = useDarkMode();

  const deleteIconClassName = darkMode
    ? classes.darkModeIcon
    : classes.deleteIcon;

  return (
    <Tooltip
      tooltipText="Delete Nugget"
      trigger={
        <button
          type="button"
          aria-label="Delete Nugget"
          onClick={handleDeleteNugget}
          className={classes.deleteButton}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader />
          ) : (
            <img
              src={deleteIcon}
              alt="Delete"
              className={deleteIconClassName}
            />
          )}
        </button>
      }
    />
  );
};
