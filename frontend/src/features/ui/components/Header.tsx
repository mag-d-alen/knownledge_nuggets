
import sun from '../../../assets/sun.svg';
import moon from '../../../assets/moon.svg';
import classes from './Header.module.scss';
import { useDarkMode } from '../../../providers/DarkModeProvider';
import { CreateNuggetModal } from '../../nugget/createNugget/CreateNuggetModal';


export const Header: React.FC = () => {
  return (
    <div className={classes.container}>
      <h3>Knowledge Nuggets</h3>
      <DarkModeToggle />
      <CreateNuggetModal />

    </div>
  );
};

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={classes.darkModeToggleContainer}>
      <button className={classes.darkModeToggle} onClick={toggleDarkMode}>
        <img
          className={classes.darkModeToggleIcon}
          src={darkMode ? moon : sun}
          alt={darkMode ? 'moon' : 'sun'}
        />
      </button>
    </div>
  );
};
