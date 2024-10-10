import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useSettings } from "./SettingsProvider";

interface WeatherData {
  temperature: number;
  description: string;
  // Add other weather properties as needed
}

interface WeatherContextProps {
  weather: WeatherData | null;
  weatherLoading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined
);

export const useWeather = () => {
  const context: any = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentLocation, updateRecentLocations, saveStorageLocation } =
    useSettings();

  // todo weatherdata type
  const [weather, setWeather] = useState<any | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (currentLocation) {
        console.log("currentLocation", currentLocation);
        try {
          const API_ENDPOINT = import.meta.env.VITE_FORECAST_API_ENDPOINT;
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

          // Definition of the parameters for the API call
          const params = {
            key: API_KEY,
            // If the name is defined we use it, otherwise we use the coordinates
            q:
              currentLocation.name ??
              `${currentLocation.coordinates?.latitude},${currentLocation.coordinates?.longitude}`,
            days: "6",
            aqi: "yes",
            lang: "fr",
          };

          // Build the URL with the parameters
          const url = new URL(API_ENDPOINT);
          url.search = new URLSearchParams(params).toString();

          fetch(url.toString())
            .then((response) => {
              console.log(response);
              if (!response.ok) {
                throw new Error("Failed to fetch weather data");
              }

              response.json().then((data) => {
                // Update the weather state
                setWeather(data);

                if (!currentLocation.name) {
                  // If the location name is not set, it means we were using the user's current location
                  // We update the location name in the settings
                  // So that when we reload it will be displayed instantly,
                  //   instead of looking for the user's location again
                  saveStorageLocation({
                    name: data.location.name,
                    coordinates: {
                      latitude: data.location.lat,
                      longitude: data.location.lon,
                    },
                  });
                }

                // Update the recent locations
                // We only update the recent locations if the data fetching is successful
                // This way we avoid adding invalid locations to the recent locations
                updateRecentLocations({
                  name: data.location.name,
                  coordinates: {
                    latitude: data.location.lat,
                    longitude: data.location.lon,
                  },
                });

                // Update loading state
                setWeatherLoading(false);
                setError(null);
              });
            })
            .catch((err) => {
              setError(err.message);
              throw new Error("Failed to fetch weather data");
            });
        } catch (err: any) {
          console.log("err1", err);
          setError(err.message);
          setWeatherLoading(false);
        }
      }
    };

    fetchWeather();
  }, [currentLocation]);

  return (
    <WeatherContext.Provider value={{ weather, weatherLoading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
