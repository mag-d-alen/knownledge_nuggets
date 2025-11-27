import { NuggetList } from '../features/nugget';
import { CreateNuggetForm } from '../features/nugget/createNugget/CreateNuggetForm';
import { Pagination } from '../features/pagination';

import { Header } from '../features/ui';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className={classes.container}>
        <CreateNuggetForm />
        <NuggetList />
      </main>
      <footer>
        <Pagination />
      </footer>
    </>
  );
};
