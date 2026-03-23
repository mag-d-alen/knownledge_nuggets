import { usePaginatedNuggets } from '../hooks';
import classes from './Pagination.module.scss';

export const PaginationButtons = (
) => {

  const { isLoading, currentPage, isLastPage, nextPage, prevPage } = usePaginatedNuggets();


  return (
    <div className={classes.paginationButtonsContainer}>
      <button onClick={prevPage} disabled={currentPage === 1 || isLoading} aria-label='Previous'>
        Previous
      </button>
      <button onClick={nextPage} disabled={isLastPage || isLoading} aria-label='Next'>
        Next
      </button>
    </div>
  );
};
