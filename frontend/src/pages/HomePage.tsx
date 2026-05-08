import { CreateNuggetModal } from '../features/nugget/createNugget/CreateNuggetModal';
import classes from './PageLayout.module.scss';
import { NuggetList } from '../features/nugget/components/NuggetList';
import { Header } from '../features/ui/components/Header';
export const HomePage: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.main}>
        <header className={classes.mainHeading}>
          Your knowledge in nuggets
        </header>
        <section className={classes.contentContainer}>
          <div className={classes.topContent}>
            <CreateNuggetModal />
          </div>{' '}
          <div className={classes.bottomContent}>
            <NuggetList />
          </div>
        </section>
      </main>
    </>
  );
};
