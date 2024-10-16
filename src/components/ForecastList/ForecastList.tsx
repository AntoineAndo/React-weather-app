import { useWeather } from "../../providers/WeatherProvider";
import ForecastCard from "../ForecastCard/ForecastCard";

type Props = {};

const NUMBER_OF_FORECASTS = 5;

function ForecastList({}: Props) {
  const { weather, weatherLoading, error } = useWeather();

  return (
    <div className="flex flex-col gap-5 flex-grow-[2]">
      {/* For 0 to 5 */}
      {Array.from({ length: NUMBER_OF_FORECASTS }, (_, i) => {
        const forecast = weather?.forecast?.forecastday?.at(i + 1);
        return (
          <ForecastCard
            forecast={forecast}
            key={i}
            isLoading={weatherLoading}
            error={error}
          />
        );
      })}

      {/* {weather.forecast.forecastday.slice(1).map((forecast: any) => (
        <ForecastCard forecast={forecast} key={forecast.date_epoch}  />
      ))} */}
    </div>
  );
}

export default ForecastList;
