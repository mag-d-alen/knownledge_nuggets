import { PaginationButtons, PaginationStepper } from './';
import classes from './Pagination.module.scss';

export const Pagination = () => {
  return (
    <div className={classes.container}>
      <PaginationStepper />
      <PaginationButtons />
    </div>
  );
};
