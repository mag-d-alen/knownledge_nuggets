import { useState } from 'react';
import { useGetNuggets } from '../../nugget/api/nuggetApi';

type UsePaginatedNuggetsArgs = {
  initialPage?: number;
  initialLimit?: number;
};

export const usePaginatedNuggets = ({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginatedNuggetsArgs = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const { data, isLoading, isError } = useGetNuggets({ page, limit });

  const nuggets = data?.nuggets ?? [];
  const nuggetsCount = data?.totalNuggets ?? 0;
  const isLastPage = data?.isLastPage ?? false;

  // When changing page size, always reset to the first page.
  const setLimitSafe = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  return {
    nuggets,
    nuggetsCount,
    isLastPage,
    page,
    limit,
    setPage,
    setLimit: setLimitSafe,
    isLoading,
    isError,
  };
};
