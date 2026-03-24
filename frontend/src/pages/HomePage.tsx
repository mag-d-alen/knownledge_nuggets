import { NuggetList } from '../features/nugget';
import { CreateNuggetModal } from '../features/nugget/createNugget/CreateNuggetModal';
import { Header } from '../features/ui';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.main}>
        <NuggetList />
        <CreateNuggetModal />
      </main>
    </>
  );
};
