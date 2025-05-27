import { useGetNuggetsQuery } from '../api/nuggetApi';
import { useDispatch, useSelector } from 'react-redux';
import paginationSlice from '../../pagination/slices/paginationSlice';
import type { RootState } from '../../../app/store';

export const useNuggets = () => {
  const { page, limit } = useSelector((state: RootState) => state.pagination);
  const { data, isLoading, isError } = useGetNuggetsQuery({ page, limit });
  const dispatch = useDispatch();
  dispatch(paginationSlice.actions.setTotalPages(data?.totalPages || 0));
  dispatch(paginationSlice.actions.setTotalNuggets(data?.totalNuggets || 0));
  dispatch(paginationSlice.actions.setIsLastPage(data?.isLastPage || false));
  return {
    nuggets: data?.nuggets || [],
    nuggetsCount: data?.totalNuggets || 0,
    isLoading,
    isError,
  };
};
