import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import Playlist from "./components/Playlist";
import { spotifyAuth } from "./spotifyAuth";

function App() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [userLogin, setUserLogin] = useState(false);

  const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };

  useEffect(() => {
    setSpotifyAccessToken(getTokenFromUrl().access_token);
  }, []);

  useEffect(() => {
    if (spotifyAccessToken) {
      console.log("Access token: ", spotifyAccessToken);
      setUserLogin(true);
      window.location.hash = "";
    } else {
      console.log("No access token yet!");
    }
  }, [spotifyAccessToken]);

  const handleLogin = () => {
    spotifyAuth();
  };

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = ({ target }) => setSearchInput(target.value);
  const resetSearchInput = () => setSearchInput("");

  const [searchData, setSearchData] = useState([]);
  const refreshSearch = () => {
    setSearchData([]);
    setDisplaySearchResult(false);
    setSearchInput("");
  };

  const [playlistName, setPlaylistName] = useState("");
  const namingPlaylist = ({ target }) => setPlaylistName(target.value);

  const [playlistTrack, setPlaylistTrack] = useState([]);
  const [playlistUris, setPlaylistUris] = useState([]);

  // Call HTTP requests upon submitting the search input
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const searchEndpoint = "https://api.spotify.com/v1/search";
  const parseQueryString = (queryString) => {
    return queryString.replace(" ", "+");
  };
  async function getSearchResult(accessToken) {
    const urlToFetch = `${searchEndpoint}?q=${parseQueryString(
      searchQuery
    )}&type=track`;
    console.log("Fetching from ", urlToFetch);
    const response = await fetch(urlToFetch, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    return data;
  }
  useEffect(() => {
    //fetch data from spotify based on search result, called everytime user click Search or submit a search input
    // jsonResponse = await response.json()
    if (searchQuery) {
      console.log("Searching for ", searchQuery);
      getSearchResult(spotifyAccessToken).then((jsonResponse) => {
        const items = jsonResponse.tracks.items;
        setSearchData(
          items.map((item) => {
            const trackObject = {
              id: item.id,
              track: item.name,
              artists: item.artists.map((artistObject) => artistObject.name),
              uri: item.uri,
            };
            return trackObject;
          })
        );
        setDisplaySearchResult(true);
        setSearchQuery("");
      });
    }
  }, [searchQuery]);

  return (
    <>
      <div className="dark-layer"></div>
      <Header handleLogin={handleLogin} isLoggedIn={userLogin} />
      <main>
        <SearchBar
          searchInput={searchInput}
          handleSearchInput={handleSearchInput}
          resetSearchInput={resetSearchInput}
          handleSearchSubmit={handleSearchSubmit}
          refreshSearch={refreshSearch}
        />
        <div className="main-display">
          {displaySearchResult && (
            <SearchResult
              searchData={searchData}
              setPlaylistTrack={setPlaylistTrack}
              displaySearchResult={displaySearchResult}
            />
          )}
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            handlePlaylistName={namingPlaylist}
            playlistTrack={playlistTrack}
            setPlaylistTrack={setPlaylistTrack}
            setPlaylistUris={setPlaylistUris}
            displaySearchResult={displaySearchResult}
          />
        </div>
      </main>
    </>
  );
}

export default App;
