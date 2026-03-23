import { usePaginatedNuggets } from '../hooks';
import classes from './Pagination.module.scss';

export const PaginationStepper = () => {

  const { currentPageSize, setPageSize } = usePaginatedNuggets();
  const updateLimit = (limitInput: string) => {
    const newLimit = parseInt(limitInput);
    setPageSize(newLimit);
  };

  return (
    <select
      aria-label='select pagination'
      value={currentPageSize}
      onChange={(e) => updateLimit(e.target.value)}
      className={classes.paginationStepper}>
      <option aria-label='5 items per page' value={5}>
        5
      </option>
      <option aria-label='10 items per page' value={10}>
        10
      </option>
      <option aria-label='20 items per page' value={20}>
        20
      </option>
    </select>
  );
};
