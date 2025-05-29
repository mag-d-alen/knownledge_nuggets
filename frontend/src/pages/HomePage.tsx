import { CreateNuggetForm, NuggetList } from '../features/nugget';
import { Pagination } from '../features/pagination';

import { Header } from '../features/ui';
import classes from './PageLayout.module.scss';
export const HomePage: React.FC = () => {
  return (
    <div className={classes.container}>
      <Header />
      <CreateNuggetForm />
      <NuggetList />
      <Pagination />
    </div>
  );
};
