import { NuggetList } from '../features/nugget';
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
    </>
  );
};
