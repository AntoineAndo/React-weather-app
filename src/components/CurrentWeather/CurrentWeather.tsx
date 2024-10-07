import React from "react";
import { useWeather } from "../../providers/WeatherProvider";
import AirQualityIcon from "../AirQualityIcon/AirQualityIcon";
import style from "./CurrentWeather.module.scss";

type Props = {};

function CurrentWeather({}: Props) {
  const { weather, weatherLoading } = useWeather();

  console.log(weather);

  return (
    <div className={style.currentWeatherContainer}>
      {weatherLoading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
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
              <p className={style.label}>Humidité</p>
              <p className={style.detail}>{weather.current.humidity}</p>
            </div>
            {/* Wind */}
            <div>
              <p className={style.label}>Vent (km/h)</p>
              <p className={style.detail}>{weather.current.wind_kph}</p>
            </div>
            {/* Air quality */}
            <div>
              <p className={style.label}>Qualité d'air</p>
              <p className={style.detail}>
                <AirQualityIcon
                  value={weather.current.air_quality["gb-defra-index"]}
                />
              </p>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default CurrentWeather;
