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
          <header>
            <h3>{nuggetsCount} nuggets found</h3>
          </header>
          {nuggets?.map((nugget) => (
            <NuggetCard nugget={nugget} />
          ))}
        </div>
      ) : (
        <EmptyNuggets />
      )}
    </>
  );
};
const EmptyNuggets = () => {
  return (
    <div className={classes.container}>
      <p>No nuggets found</p>
    </div>
  );
};
