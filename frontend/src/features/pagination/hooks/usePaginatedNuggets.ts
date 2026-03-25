import { getNuggets } from "../../nugget/api/nuggetApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePaginatedNuggets = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["nuggets"],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getNuggets({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page?.nuggets).length;
      return lastPage?.totalNuggets && totalFetched < lastPage?.totalNuggets
        ? allPages.length + 1
        : undefined;
    },
  });

  const nuggets = data?.pages.flatMap((page) => page?.nuggets) ?? [];
  const nuggetsCount =
    data?.pages.reduce(
      (count, page) => count + (page?.nuggets?.length || 0),
      0,
    ) ?? 0;

  return {
    nuggets,
    nuggetsCount,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
