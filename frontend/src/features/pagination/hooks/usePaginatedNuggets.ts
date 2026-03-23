import { useState } from 'react';
import { getNuggets } from '../../nugget/api/nuggetApi';
import { useQuery } from '@tanstack/react-query';

type UsePaginatedNuggetsArgs = {
  page?: number;
  pageSize?: number;
};



export const usePaginatedNuggets = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nuggets"],
    queryFn: async () => await getNuggets({ page: currentPage, limit: currentPageSize }),
    refetchOnWindowFocus: false,
  });

  const nextPage = () => {
    if (data && currentPage * currentPageSize < data.totalNuggets) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return {
    nuggets: data?.nuggets || [],
    isLoading,
    isError,
    nuggetsCount: data?.totalNuggets || 0,

    setPage: setCurrentPage,
    setPageSize: setCurrentPageSize,
    nextPage,
    prevPage,
    currentPage,
    currentPageSize,
    isLastPage: data && currentPage * currentPageSize >= data.totalNuggets,
  };
}

