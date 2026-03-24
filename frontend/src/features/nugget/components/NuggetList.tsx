import classes from './Nugget.module.scss';
import { NuggetCard } from './NuggetCard';
import { Loader } from '../../ui/components/Loader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { usePaginatedNuggets } from '../../pagination/hooks/usePaginatedNuggets';

export const NuggetList = () => {
  const {
    nuggets,
    nuggetsCount,
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
  }, [inView]);

  if (isLoading) return <Loader loadingText='Loading nuggets...' />;
  if (isError) return <div>Error loading nuggets</div>;

  const title =
    nuggetsCount > 0 ? `${nuggetsCount} nuggets found` : 'No nuggets found';
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      {nuggets.length > 0 &&
        nuggets.map((nugget) => <NuggetCard key={nugget.id} nugget={nugget} />)}
      <p className={classes.loadMore} ref={ref}>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
      </p>
    </section>
  );
};
