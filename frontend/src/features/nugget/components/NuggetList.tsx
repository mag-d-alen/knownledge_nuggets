import classes from './Nugget.module.scss';
import { NuggetCard } from './NuggetCard';
import { Loader } from '../../ui/components/Loader';
import type { Nugget } from '../models';

type NuggetListProps = {
  nuggets: Nugget[];
  nuggetsCount: number;
  isLoading: boolean;
  isError: boolean;
};

export const NuggetList = ({
  nuggets,
  nuggetsCount,
  isLoading,
  isError,
}: NuggetListProps) => {
  if (isLoading) return <Loader loadingText='Loading nuggets...' />;
  if (isError) return <div>Error loading nuggets</div>;
  const hasNuggets = nuggetsCount > 0;
  const title =
    nuggets?.length > 0 ? `${nuggetsCount} nuggets found` : 'No nuggets found';
  return (
    <section className={classes.container}>
      <h2 className={classes.title}>{title}</h2>
      {hasNuggets &&
        nuggets?.map((nugget) => (
          <NuggetCard key={nugget.id} nugget={nugget} />
        ))}
    </section>
  );
};
