import { CreateNuggetForm } from '../features/nugget/components/CreateNuggetForm';
import { NuggetList } from '../features/nugget/components/NuggetList';
export const HomePage: React.FC = () => {
  return (
    <div>
      <CreateNuggetForm />
      <NuggetList />
    </div>
  );
};
