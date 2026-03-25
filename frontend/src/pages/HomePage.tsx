import { Grid, Heading } from '@radix-ui/themes';
import { NuggetList } from '../features/nugget';
import { CreateNuggetModal } from '../features/nugget/createNugget/CreateNuggetModal';
import classes from './PageLayout.module.scss';
import { Header } from '../features/ui';
export const HomePage: React.FC = () => {
  return (
    <>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.main}>
        <Heading align={'center'} size='6' className={classes.heading}>
          Your knowledge in nuggets
        </Heading>
        <Grid columns={{ initial: '1', md: '2' }} gap='3' width='auto'>
          <div className={classes.bottomContent}>
            <CreateNuggetModal />
          </div>{' '}
          <div className={classes.topContent}>
            <NuggetList />
          </div>
        </Grid>
      </main>
    </>
  );
};
