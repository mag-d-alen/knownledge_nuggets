import { NuggetList } from '../features/nugget';
import { CreateNuggetForm } from '../features/nugget/createNugget/CreateNuggetForm';
import { Pagination, usePaginatedNuggets } from '../features/pagination';
import { Header } from '../features/ui';
import { DarkModeProvider } from '../providers/DarkModeProvider';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  const {
    nuggets,
    nuggetsCount,
    isLoading,
    isError,
    isLastPage,
    page,
    limit,
    setPage,
    setLimit,
  } = usePaginatedNuggets();

  return (
    <DarkModeProvider>
        <header className={classes.header}>
          <Header />
        </header>
        <main className={classes.container}>
          <CreateNuggetForm />
          <NuggetList
            nuggets={nuggets}
            nuggetsCount={nuggetsCount}
            isLoading={isLoading}
            isError={isError}
          />
        </main>
        <footer className={classes.footer}>
          <Pagination
            page={page}
            limit={limit}
            isLastPage={isLastPage}
            setPage={setPage}
            setLimit={setLimit}
          />
        </footer>
    </DarkModeProvider>
  );
};
