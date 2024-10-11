import {
  useEffect,
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

export interface Location {
  name?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface SettingsContextType {
  currentLocation?: Location;
  theme: Theme;
  toggleTheme: () => void;
  saveLocation: ({ name, coordinates }: Location) => void;
  updateRecentLocations: (location: any) => void;
  saveStorageLocation: (location: Location) => void;
  error: string | null;
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
  const [error, setError] = useState<string | null>(null);

  // Clear recent data from local storage
  // localStorage.removeItem("recentLocations");
  // localStorage.removeItem("location");

  // Get the current location from local storage
  const localLocation = localStorage.getItem("location");

  // If the location is set, use it as the initial location
  // If the name is missing, the location is invalid and set to undefined
  const initialLocation =
    localLocation && JSON.parse(localLocation).name
      ? JSON.parse(localLocation)
      : undefined;

  // If the location is not set, request user's location
  const [currentLocation, setCurrentLocation] =
    useState<Location>(initialLocation);

  // Save the location to local storage
  // Will trigger a re-fetch of the weather data using the new location
  const saveLocation = (location: Location) => {
    setCurrentLocation(location);
    setError(null);
  };

  const saveStorageLocation = (location: Location) => {
    localStorage.setItem("location", JSON.stringify(location));
  };

  useEffect(() => {
    // If the user's last position is not saved in local storage
    // Request the user's location
    if (!initialLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Create a location object with the user's coordinates
          const location: Location = {
            name: undefined,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };

          // Set the location in the state
          // Will trigger a re-fetch of the weather data using the new location
          setCurrentLocation(location);

          setError(null);

          // Save the location to local storage
          saveStorageLocation(location);
        },
        (_) => {
          // If the user denies the location request
          setError(
            "Vous devez autoriser la géolocalisation pour utiliser l'application"
          );
          // setCurrentLocation({}:);
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

  /**
   * Update the list of recent locations in the local storage
   * @param location The location to add to the list
   */
  const updateRecentLocations = (location: any) => {
    // Add the location to the list of recent locations
    const recentLocations = localStorage.getItem("recentLocations");

    if (recentLocations) {
      const recentArray = JSON.parse(recentLocations);

      // Remove the location if it already exists in the list
      const filteredLocations = recentArray.filter((l: any) => {
        return location.name !== l.name;
      });

      localStorage.setItem(
        "recentLocations",
        JSON.stringify([location, ...filteredLocations])
      );
    } else {
      localStorage.setItem("recentLocations", JSON.stringify([location]));
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme,
        currentLocation,
        saveLocation,
        saveStorageLocation,
        updateRecentLocations,
        error,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
