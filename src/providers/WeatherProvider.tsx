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
  loading: boolean;
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
  const { currentLocation } = useSettings();

  // todo weatherdata type
  const [weather, setWeather] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_ENDPOINT = import.meta.env.VITE_WEATHER_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

        const params = {
          key: API_KEY,
          q: `${currentLocation?.lat},${currentLocation?.lng}`,
        };

        const url = new URL(API_ENDPOINT);
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();

        setWeather(data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider, WeatherContext };
