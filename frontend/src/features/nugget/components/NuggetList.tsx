import classes from './Nugget.module.scss';

import { useNuggets } from '../hooks/useNuggets';
import { NuggetCard } from './NuggetCard';

export const NuggetList = () => {
  const { nuggets, nuggetsCount, isLoading, isError } = useNuggets();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading nuggets</div>;
  return (
    <section>
      {nuggets.length > 0 ? (
        <div className={classes.container}>
          <header>
            <h3>{nuggetsCount} nuggets found</h3>
          </header>
          {nuggets?.map((nugget) => (
            <NuggetCard key={nugget.id} nugget={nugget} />
          ))}
        </div>
      ) : (
        <EmptyNuggets />
      )}
    </section>
  );
};
const EmptyNuggets = () => {
  return (
    <div className={classes.container}>
      <p>No nuggets found</p>
    </div>
  );
};
