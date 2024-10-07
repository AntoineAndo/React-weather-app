import { useWeather } from "../../providers/WeatherProvider";
import AirQualityIcon from "../AirQualityIcon/AirQualityIcon";
import style from "./CurrentWeather.module.scss";

type Props = {};

function CurrentWeather({}: Props) {
  const { weather, weatherLoading } = useWeather();

  if (weatherLoading) {
    return <p>Loading...</p>;
  }

  if (!weather) {
    return <p>Failed to fetch weather data</p>;
  }

  console.log(weather);

  return (
    <div className={style.currentWeatherContainer}>
      <p>Today {new Date().toLocaleDateString("fr-FR")}</p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
        className={style.weatherIcon}
      />
      <p className={style.currentTemperature}>{weather.current.temp_c}°</p>
      <div className={style.currentWeatherDetailContainer}>
        {/* Humidity */}
        <div>
          <p className={style.label}>Humidity</p>
          <p className={style.detail}>{weather.current.humidity}</p>
        </div>
        {/* Wind */}
        <div>
          <p className={style.label}>Wind (km/h)</p>
          <p className={style.detail}>{weather.current.wind_kph}</p>
        </div>
        {/* Air quality */}
        <div>
          <p className={style.label}>Air quality</p>
          <p className={style.detail}>
            <AirQualityIcon
              value={weather.current.air_quality["gb-defra-index"]}
            />
          </p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
