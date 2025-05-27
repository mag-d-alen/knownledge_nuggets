import { PaginationButtons, PaginationStepper } from '../../pagination';
import classes from './Nugget.module.scss';

import { useNuggets } from '../hooks/useNuggets';
import { NuggetCard } from './NuggetCard';

export const NuggetList = () => {
  const { nuggets, nuggetsCount, isLoading } = useNuggets();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {nuggets.length > 0 ? (
        <div className={classes.container}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
            }}>
            {nuggetsCount} nuggets found.
            {nuggets?.map((nugget) => (
              <NuggetCard
                key={nugget.id}
                id={nugget.id}
                title={nugget.title}
                content={nugget.content}
                tags={nugget.tags}
              />
            ))}
          </div>
          <PaginationButtons />
          <PaginationStepper />
        </div>
      ) : (
        <NuggetListSkeleton />
      )}
    </>
  );
};
const NuggetListSkeleton = () => {
  return (
    <div className={classes.container}>
      <div className={classes.skeleton}></div>
    </div>
  );
};