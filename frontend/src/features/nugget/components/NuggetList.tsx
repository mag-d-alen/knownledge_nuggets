import classes from './Nugget.module.scss';
import { NuggetCard } from './NuggetCard';
import { Loader } from '../../ui/components/Loader';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { usePaginatedNuggets } from '../../pagination/hooks/usePaginatedNuggets';
import { Container } from '@radix-ui/themes';

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
  }, [inView]);

  if (isLoading) return <Loader loadingText='Loading nuggets...' />;
  if (isError) return <div>Error loading nuggets</div>;


  return (
    <Container className={classes.listContainer}>
      {nuggets.length > 0 &&
        nuggets.map((nugget) => <NuggetCard key={nugget.id} nugget={nugget} />)}
      <p className={classes.loadMore} ref={ref}>
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
      </p>
    </Container>
  );
};
