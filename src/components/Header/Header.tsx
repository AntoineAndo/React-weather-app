import style from "./Header.module.scss";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useWeather } from "../../providers/WeatherProvider";
import { useState } from "react";

type Props = {};

function Header({}: Props) {
  const { weather, loading: weatherLoading } = useWeather();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const openSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

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

      {isSearchVisible && (
        <div className={style.searchInputContainer}>
          <input type="text" value={searchValue} onChange={onChange} />
        </div>
      )}
    </header>
  );
}

export default Header;
