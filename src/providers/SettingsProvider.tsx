import {
  useEffect,
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface SettingsContextType {
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  theme: Theme;
  toggleTheme: () => void;
  saveLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get the theme from local storage
  const localTheme = localStorage.getItem("theme") as Theme;
  const [theme, setTheme] = useState<Theme>(localTheme || "light");

  // Get the current location from local storage
  const localLocation = localStorage.getItem("location");

  // If the location is set, use it as the initial location
  // If any of the latitude or longitude is missing, the location is invalid and set to undefined
  const initialLocation =
    localLocation &&
    JSON.parse(localLocation).latitude &&
    JSON.parse(localLocation).longitude
      ? JSON.parse(localLocation)
      : undefined;

  // localStorage.removeItem("recentLocations");

  // If the location is not set, request user's location
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(initialLocation);

  // Save the location to local storage
  // Will trigger a re-fetch of the weather data using the new location
  const saveLocation = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    const location = { latitude, longitude };
    setCurrentLocation(location);
    // Save the location to local storage
    localStorage.setItem("location", JSON.stringify(location));
  };

  useEffect(() => {
    // If the user's last position is not saved in local storage
    // Request the user's location
    if (!initialLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCurrentLocation(location);
          // Save the location to local storage
          localStorage.setItem("location", JSON.stringify(location));
        },
        (error) => {
          // If the user denies the location request
          console.error("Error getting location:", error);
        }
      );
    } else {
      // console.log("Location already set");
      // console.log("Location", currentLocation);
    }
  }, [localLocation]);

  // Set the theme on the root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle the theme between light and dark
  // Save the theme to local storage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Save the theme to local storage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, currentLocation, saveLocation }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
