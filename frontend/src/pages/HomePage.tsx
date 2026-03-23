import { NuggetList } from '../features/nugget';
import { Pagination, usePaginatedNuggets } from '../features/pagination';
import { Header } from '../features/ui';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  const {
    nuggets,
    nuggetsCount,
    isLoading,
    isError,
  } = usePaginatedNuggets();


  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.container}>
        <NuggetList
          nuggets={nuggets}
          nuggetsCount={nuggetsCount}
          isLoading={isLoading}
          isError={isError}
        />
      </main>
      <footer className={classes.footer}>
        <Pagination

        />
      </footer>
    </>
  );
};
