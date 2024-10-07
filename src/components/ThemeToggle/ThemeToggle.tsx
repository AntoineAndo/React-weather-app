import style from "./ThemeToggle.module.scss";
import { useSettings } from "../../providers/SettingsProvider";

type Props = {};

function ThemeToggle({}: Props) {
  const { theme, toggleTheme } = useSettings();

  return (
    <button className={style.themeToggle} onClick={toggleTheme}>
      {theme == "dark" ? "🌞" : "🌜"}
    </button>
  );
}

export default ThemeToggle;
