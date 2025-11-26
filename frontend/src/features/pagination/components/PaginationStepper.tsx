import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import paginationSlice from '../slices/paginationSlice';
import classes from './Pagination.module.scss';
export const PaginationStepper = () => {
  const { limit } = useSelector((state: RootState) => state.pagination);
  const dispatch = useDispatch();
  const updateLimit = (limitInput: string) => {
    const newLimit = parseInt(limitInput);
    dispatch(paginationSlice.actions.setLimit(newLimit));
  };

  return (
    <select value={limit} onChange={(e) => updateLimit(e.target.value)} className={classes.paginationStepper}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  );
};
