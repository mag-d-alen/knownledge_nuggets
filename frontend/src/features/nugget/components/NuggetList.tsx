import classes from './Nugget.module.scss';
import { NuggetCard } from './NuggetCard';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { usePaginatedNuggets } from '../../pagination/hooks/usePaginatedNuggets';
import { NuggetListSkeleton } from './NuggetListSkeleton';

export const NuggetList = () => {
  const {
    nuggets,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePaginatedNuggets();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (isError) return <div>Error loading nuggets</div>;
  return (
    <div className={classes.listContainer}>
      {isLoading && <NuggetListSkeleton />}
      {nuggets.length > 0 ? (
        nuggets.map((nugget) => <NuggetCard key={nugget.id} nugget={nugget} />)
      ) : (
        <NuggetListSkeleton />
      )}

      <p className={classes.loadMore} ref={ref}>
        {isFetchingNextPage ? (
          <NuggetListSkeleton />
        ) : hasNextPage ? (
          <NuggetListSkeleton />
        ) : (
          <span>No more nuggets to load</span>
        )}
      </p>
    </div>
  );
};
