import { CreateNuggetForm, NuggetList } from '../features/nugget';
import { Header } from '../features/ui';
export const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <CreateNuggetForm />
      <NuggetList />
    </div>
  );
};
