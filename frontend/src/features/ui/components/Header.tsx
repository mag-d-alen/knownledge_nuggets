
import classes from './Header.module.scss';
import { DarkModeToggle } from './DarkModeToggle';


export const Header: React.FC = () => {
  return (
    <div className={classes.container}>
      <h3>Knowledge Nuggets</h3>
      <DarkModeToggle />
    </div>
  );
};


