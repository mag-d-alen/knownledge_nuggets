import classes from "./DarkModeToggle.module.scss";
import sun from "../../../assets/sun.svg";
import moon from "../../../assets/moon.svg";
import { useDarkMode } from "../../../providers/DarkModeProvider";
import { Button } from "@radix-ui/themes";

export const DarkModeToggle = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return (
        <div className={classes.darkModeToggleContainer}>
            <Button className={classes.darkModeToggle} onClick={toggleDarkMode}>
                <img
                    className={classes.darkModeToggleIcon}
                    src={darkMode ? moon : sun}
                    alt={darkMode ? 'moon' : 'sun'}
                />
            </Button>
        </div>
    );
};