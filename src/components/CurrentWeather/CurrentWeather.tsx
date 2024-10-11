import React from "react";
import { useWeather } from "../../providers/WeatherProvider";
import AirQualityIcon from "../AirQualityIcon/AirQualityIcon";
import { useSettings } from "../../providers/SettingsProvider";
// import style from "./CurrentWeather.module.scss";

type Props = {};

function CurrentWeather({}: Props) {
  const { weather, weatherLoading, error } = useWeather();

  return (
    <div className="flex flex-col flex-grow-[4] justify-evenly items-center gap-5 h-[50vh] rounded-xl lg:h-full">
      {weatherLoading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          {/* Current date */}
          <div className="flex flex-col w-full h-full md:flex-row bg-[color:--background-2] rounded-2xl justify-evenly lg:flex-col lg:h-full lg:p-5">
            {/* If error, display the error */}
            {error && (
              <div className="text-[color:--error] text-center font-semibold">
                {error}
              </div>
            )}

            {/* Else display the current condition */}
            {!error && (
              <>
                <div className="flex flex-col items-center md:flex-grow-[2] justify-center">
                  {/* Icon for the current condition */}
                  <img
                    src={weather.current.condition.icon}
                    alt={weather.current.condition.text}
                    className="w-24 h-24 md:w-52 md:h-52"
                  />
                  {/* Current condition */}
                  <p>{weather.current.condition.text}</p>
                  {/* Current temperature */}
                  <p className="text-7xl font-bold self-center">
                    {weather.current.temp_c}°
                  </p>
                </div>

                {/* Day secondary info */}
                <div className="flex gap-2 w-full justify-between box-border items-start md:flex-col md:w-auto md:flex-1 lg:flex-row">
                  {/* Humidity */}
                  <div className="flex flex-col flex-1 items-center justify-center">
                    <p className="text-lg">Humidité</p>
                    <p className="text-5xl">{weather.current.humidity}</p>
                  </div>
                  {/* Wind */}
                  <div className="flex flex-col flex-1 items-center justify-center">
                    <p className="text-lg">Vent (km/h)</p>
                    <p className="text-5xl">{weather.current.wind_kph}</p>
                  </div>
                  {/* Air quality */}
                  <div className="flex flex-col flex-1 items-center justify-center">
                    <p className="text-lg">Qualité d'air</p>
                    <div className="text-5xl">
                      <AirQualityIcon
                        value={weather.current.air_quality["gb-defra-index"]}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default CurrentWeather;
