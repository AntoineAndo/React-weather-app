import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useWeather } from "../../providers/WeatherProvider";
import { useState } from "react";
import SearchModal from "../SearchModal/SearchModal";

type Props = {};

function Header({}: Props) {
  const { weather, loading: weatherLoading } = useWeather();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const openSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="flex justify-between items-center p-3 relative">
      {/* Theme toggle */}
      <div className="flex flex-1">
        <ThemeToggle />
      </div>

      <h1 className="flex-grow-[10] text-center text-2xl font-bold">
        {/* Display the location in the format City, Country */}
        {weather && !weatherLoading
          ? `${weather.location.name}, ${weather.location.country}`
          : "---"}
      </h1>

      {/* Search button */}
      <div className="flex flex-1 content-end">
        <button
          className="flex text-base cursor-pointer rounded-full w-10 h-10 aspect-square justify-center items-center border-solid border-2 border-collapse border-[color:--text-primary] md:h-16 md:w-16"
          onClick={openSearch}
        >
          🔍
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        {isSearchVisible && (
          <SearchModal closeModal={() => setIsSearchVisible(false)} />
        )}
      </div>
    </header>
  );
}

export default Header;
