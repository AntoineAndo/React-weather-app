import style from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useWeather } from "../../providers/WeatherProvider";

type Props = {};

function Header({}: Props) {
  const { weather, loading: weatherLoading } = useWeather();

  const openSearch = () => {};

  return (
    <header className={style.header}>
      <div className={style.themeToggleSlot}>
        <ThemeToggle />
      </div>
      <h1 className={style.title}>
        {/* Display the location in the format City, Country */}
        {weather && !weatherLoading
          ? `${weather.location.name}, ${weather.location.country}`
          : "---"}
      </h1>
      <button className={style.searchButton} onClick={openSearch}>
        🔍
      </button>
    </header>
  );
}

export default Header;
