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
    lat: string;
    lng: string;
  };
  theme: Theme;
  toggleTheme: () => void;
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
  // If the location is not set, request user's location
  const [currentLocation, setCurrentLocation] = useState<{
    lat: string;
    lng: string;
  }>(localLocation ? JSON.parse(localLocation) : undefined);

  useEffect(() => {
    // If the user's last position is not saved in local storage
    // Request the user's location
    if (!localLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

    // Save the theme to local storage
    localStorage.setItem("theme", theme);
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, currentLocation }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
