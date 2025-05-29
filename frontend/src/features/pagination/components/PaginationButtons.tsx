import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import paginationSlice from '../../pagination/slices/paginationSlice';
import classes from './Pagination.module.scss';
export const PaginationButtons = () => {
  const { page, isLastPage } = useSelector(
    (store: RootState) => store.pagination
  );
  const dispatch = useDispatch();
  const updatePage = (newPage: number) => {
    dispatch(paginationSlice.actions.setPage(newPage));
  };
  const goForward = () => updatePage(page + 1);
  const goBack = () => updatePage(page - 1);
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
