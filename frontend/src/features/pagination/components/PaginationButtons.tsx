import classes from './Pagination.module.scss';

export const PaginationButtons = ({
  page,
  isLastPage,
  setPage,
}: {
  page: number;
  isLastPage: boolean;
  setPage: (page: number) => void;
}) => {
  const goForward = () => {
    setPage(page + 1);
  };

  const goBack = () => {
    setPage(page - 1);
  };

  return (
    <div className={classes.paginationButtonsContainer}>
      <button onClick={goBack} disabled={page === 1}>
        Previous
      </button>
      <button onClick={goForward} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
};
