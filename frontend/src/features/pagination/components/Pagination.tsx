import { PaginationButtons, PaginationStepper } from './';
import classes from './Pagination.module.scss';

type PaginationProps = {
  limit: number;

  setLimit: (limit: number) => void;
};

export const Pagination = () => {
  return (
    <div className={classes.container}>
      <PaginationStepper />
      <PaginationButtons
      />
    </div>
  );
};
