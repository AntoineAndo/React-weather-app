import { Fragment, useState } from "react";
import style from "./SearchModal.module.scss";
import { useSettings } from "../../providers/SettingsProvider";

type Props = {
  onBlur: Function;
};

function SearchModal({ onBlur }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const { saveLocation } = useSettings();

  const recentLocations = JSON.parse(
    localStorage.getItem("recentLocations") ?? "[]"
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // Get the API endpoint and key from the environment variables
    const ENDPOINT = import.meta.env.VITE_API_NINJA_ENDPOINT;
    const KEY = import.meta.env.VITE_API_NINJA_KEY;

    const params = new URLSearchParams({
      name: e.target.value,
      limit: "5",
    });

    // Build url
    const url = new URL(ENDPOINT);
    url.search = params.toString();

    fetch(url.toString(), {
      headers: {
        "x-api-key": KEY,
      },
    }).then((response) => {
      response.json().then((data) => {
        setSearchResults(data);
      });
    });
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchResults(null);
  };

  //   Get the user's current location, save it and close the modal
  //   Todo - find a solution for the delay between the click and the location update
  const setCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      saveLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      onBlur();
    });
  };

  //   Save the selected location and close the modal
  const onLocationClick = (suggestion: any) => {
    saveLocation({
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
    });

    // Add the location to the list of recent locations
    const newLocation = {
      name: suggestion.name,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
    };

    const recentLocations = localStorage.getItem("recentLocations");

    if (recentLocations) {
      const recentArray = JSON.parse(recentLocations);

      // Remove the location if it already exists in the list
      const filteredLocations = recentArray.filter((location: any) => {
        return location.name !== newLocation.name;
      });

      localStorage.setItem(
        "recentLocations",
        JSON.stringify([newLocation, ...filteredLocations])
      );
    } else {
      localStorage.setItem("recentLocations", JSON.stringify([newLocation]));
    }

    onBlur();
  };

  return (
    <div className={style.backdrop} onPointerUp={() => onBlur()}>
      <div
        className={style.modal}
        onPointerUp={(e) => {
          // Prevent the click from propagating to the backdrop and closing the modal
          e.stopPropagation();
        }}
      >
        {/* Search input */}
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.input}
            value={searchValue}
            onChange={onChange}
          />

          {/* Button to clear the field */}
          <span className={style.close} onClick={clearSearch}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </span>
        </div>

        {/* 
        Suggestion list 
        Display the recent locations and the current location button
        If the search input is not empty, display the search results
        */}
        <ul>
          {/* Search results */}
          {searchResults !== null &&
            searchResults.map((suggestion: any, index: number) => {
              return (
                <Fragment>
                  <li onClick={() => onLocationClick(suggestion)}>
                    {suggestion.name}
                  </li>
                  {index !== searchResults.length - 1 && <hr />}
                </Fragment>
              );
            })}

          {/* Default suggestions */}
          {searchResults === null && (
            <Fragment>
              {/* Option to set the current user's location */}
              <li onClick={() => setCurrentUserLocation()}>
                <i className="fa fa-location-arrow" aria-hidden="true"></i>
                Position actuelle
              </li>
              <hr />

              {/* Recent locations */}
              {recentLocations.map((location: any, index: number) => {
                return (
                  <Fragment>
                    <li onClick={() => onLocationClick(location)}>
                      {location.name}
                    </li>
                    {index !== recentLocations.length - 1 && <hr />}
                  </Fragment>
                );
              })}
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchModal;
