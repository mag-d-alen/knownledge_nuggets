import { PaginationButtons, PaginationStepper } from './';
import classes from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  limit: number;
  isLastPage: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

export const Pagination = ({
  page,
  limit,
  isLastPage,
  setPage,
  setLimit,
}: PaginationProps) => {
  return (
    <div className={classes.container}>
      <PaginationStepper limit={limit} setLimit={setLimit} />
      <PaginationButtons
        page={page}
        isLastPage={isLastPage}
        setPage={setPage}
      />
    </div>
  );
};
