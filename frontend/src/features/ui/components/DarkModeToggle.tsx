import classes from "./DarkModeToggle.module.scss";
import sun from "../../../assets/sun.svg";
import moon from "../../../assets/moon.svg";
import { useDarkMode } from "../../../providers/DarkModeProvider";
import { Switch } from "@radix-ui/themes";

export const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <div className={classes.darkModeToggleContainer}>
      <img
        className={darkMode ? classes.darkModeIcon : classes.icon}
        src={moon}
        alt={"moon icon"}
      />
      <Switch
        className={classes.darkModeToggle}
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
      <img
        className={darkMode ? classes.darkModeIcon : classes.icon}
        src={sun}
        alt={"sun icon"}
      />
    </div>
  );
};
