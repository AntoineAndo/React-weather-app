import { useWeather } from "../../providers/WeatherProvider";
import ForecastCard from "../ForecastCard/ForecastCard";

type Props = {};

function ForecastList({}: Props) {
  const { weather, weatherLoading } = useWeather();

  if (weatherLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {weather.forecast.forecastday.slice(1).map((forecast: any) => (
        <ForecastCard forecast={forecast} key={forecast.date_epoch} />
      ))}
    </div>
  );
}

export default ForecastList;
