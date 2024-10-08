import { Fragment, useState } from "react";
import style from "./SearchModal.module.scss";
import { Location, useSettings } from "../../providers/SettingsProvider";

interface Props {
  closeModal: Function;
}

function SearchModal({ closeModal }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
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
    setSearchResults([]);
  };

  //   Get the user's current location, save it and close the modal
  //   Todo - find a solution for the delay between the click and the location update
  const setCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      saveLocation({
        name: undefined,
        coordinates: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
      closeModal();
    });
  };

  //   Save the selected location and close the modal
  const onLocationClick = (suggestion: Location) => {
    saveLocation(suggestion);
    closeModal();
  };

  return (
    <div className={style.modal}>
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
        {searchValue !== "" && (
          <Fragment>
            {/* Exact search - Search the exact value of the input */}
            <li
              onClick={() =>
                onLocationClick({
                  name: searchValue,
                })
              }
            >
              {searchValue}
            </li>
            <hr />

            {searchResults.map((suggestion: any, index: number) => {
              return (
                <Fragment>
                  <li onClick={() => onLocationClick(suggestion)}>
                    {suggestion.name}
                  </li>
                  {index !== searchResults.length - 1 && <hr />}
                </Fragment>
              );
            })}
          </Fragment>
        )}

        {/* Default suggestions */}
        {searchValue === "" && (
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
  );
}

export default SearchModal;
