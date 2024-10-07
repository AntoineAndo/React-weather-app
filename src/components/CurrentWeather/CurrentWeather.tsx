import { useWeather } from "../../providers/WeatherProvider";
import style from "./CurrentWeather.module.scss";

type Props = {};

function CurrentWeather({}: Props) {
  const { weather, loading } = useWeather();

  console.log(weather);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weather) {
    return <p>Failed to fetch weather data</p>;
  }

  return (
    <main className={style.currentWeatherContainer}>
      {/* <h2>{weather.current.condition.text}</h2> */}
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className={style.weatherIcon}
      />
      <div className={style.currentWeatherDetailContainer}>
        <p className={style.currentTemperature}>{weather.current.temp_c}°</p>
        <div className={style.secondaryInfo}>
          <p className={style.currentTemperature}>{weather.current.humidity}</p>
          <p className={style.currentTemperature}>{weather.current.wind_kph}</p>
        </div>
      </div>
    </main>
  );
}

export default CurrentWeather;
