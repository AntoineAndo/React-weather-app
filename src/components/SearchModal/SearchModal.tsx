import { Fragment, useState } from "react";
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
    // Modal
    <div className="absolute top-0 left-0 h-screen w-full p-5 flex flex-col bg-[color:--background] gap-3">
      {/* Search input */}
      <div className="border-solid border-2 border-[color:--text-primary] h-8 relative rounded-2xl ">
        <input
          type="text"
          className="px-4 w-full h-full outline-none color-[color:--text-primary]"
          value={searchValue}
          onChange={onChange}
        />

        {/* Button to clear the field */}
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={clearSearch}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </span>
      </div>

      {/* 
        Suggestion list 
        Display the recent locations and the current location button
        If the search input is not empty, display the search results
        */}
      <ul className="flex flex-col gap-3 list-none p-3">
        {/* Search results */}
        {searchValue !== "" && (
          <Fragment>
            {/* Exact search - Search the exact value of the input */}
            <li
              className="p-0 cursor-pointer flex gap-3 items-center"
              onClick={() =>
                onLocationClick({
                  name: searchValue,
                })
              }
            >
              {searchValue}
            </li>
            <hr className="w-full" />

            {searchResults.map((suggestion: any, index: number) => {
              return (
                <Fragment>
                  <li
                    className="p-0 cursor-pointer flex gap-3 items-center"
                    onClick={() => onLocationClick(suggestion)}
                  >
                    {suggestion.name}
                  </li>
                  {index !== searchResults.length - 1 && (
                    <hr className="w-full" />
                  )}
                </Fragment>
              );
            })}
          </Fragment>
        )}

        {/* Default suggestions */}
        {searchValue === "" && (
          <Fragment>
            {/* Option to set the current user's location */}
            <li
              className="p-0 cursor-pointer flex gap-3 items-center"
              onClick={() => setCurrentUserLocation()}
            >
              <i className="fa fa-location-arrow" aria-hidden="true"></i>
              Position actuelle
            </li>
            <hr className="w-full border-[color:--text-primary]" />

            {/* Recent locations */}
            {recentLocations.map((location: any, index: number) => {
              return (
                <Fragment>
                  <li
                    className="p-0 cursor-pointer flex gap-3 items-center"
                    onClick={() => onLocationClick(location)}
                  >
                    {location.name}
                  </li>
                  {index !== recentLocations.length - 1 && (
                    <hr className="w-full" />
                  )}
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
