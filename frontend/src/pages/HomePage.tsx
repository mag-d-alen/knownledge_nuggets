import { NuggetList } from '../features/nugget';
import { Pagination } from '../features/pagination';
import { Header } from '../features/ui';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.container}>
        <NuggetList />
      </main>
      <footer className={classes.footer}>
        <Pagination />
      </footer>
    </>
  );
};
