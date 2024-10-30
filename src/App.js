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
      setUserLogin(false);
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
  const summarizeUris = () => {
    setPlaylistUris(playlistTrack.map((trackObj) => trackObj.uri));
  };

  // Call HTTP requests upon submitting the search input
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const parseQueryString = (queryString) => {
    return queryString.replace(" ", "+");
  };

  const [nextPage, setNextPage] = useState("");

  const getSearchResult = async () => {
    const searchEndpoint = "https://api.spotify.com/v1/search";
    const urlToFetch = `${searchEndpoint}?q=${parseQueryString(
      searchQuery
    )}&type=track`;
    const response = await fetch(urlToFetch, {
      headers: {
        Authorization: "Bearer " + spotifyAccessToken,
      },
    });
    console.log("Status code (search query): ", response.status);
    const data = await response.json();
    setNextPage(data.tracks.next);
    console.log(data);
    const items = data.tracks.items;
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
  };

  const getMoreSearchResult = async () => {
    if (!nextPage) return;
    console.log(nextPage);
    const response = await fetch(nextPage, {
      headers: { Authorization: `Bearer ${spotifyAccessToken}` },
    });
    console.log("Status code (search query): ", response.status);
    const data = await response.json();
    setNextPage(data.tracks.next);
    console.log(data);
    const items = data.tracks.items;
    setSearchData(prev => [...prev,
      ...items.map((item) => {
        const trackObject = {
          id: item.id,
          track: item.name,
          artists: item.artists.map((artistObject) => artistObject.name),
          uri: item.uri,
        };
        return trackObject;
      })]
    );
    setDisplaySearchResult(true);
    setSearchQuery("");
  };

  useEffect(() => {
    //fetch data from spotify based on search result, called everytime user click Search or submit a search input
    // jsonResponse = await response.json()
    if (searchQuery) {
      console.log("Searching for ", searchQuery);
      getSearchResult();
    }
  }, [searchQuery]);

  const [userSpotifyId, setUserSpotifyId] = useState("");
  const getUserProfileEndpoint = "https://api.spotify.com/v1/me";
  const getUserId = async (accessToken) => {
    console.log("Fetching user data...");
    const response = await fetch(getUserProfileEndpoint, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    console.log("Status code (get user's info): ", response.status);
    const data = await response.json();
    console.log(data);
    return data.id;
  };
  useEffect(() => {
    if (spotifyAccessToken) {
      getUserId(spotifyAccessToken).then((userId) => {
        setUserSpotifyId(userId);
      });
    }
  }, [spotifyAccessToken]);

  const createPlaylist = async (playlistInput, userId) => {
    console.log("Creating playlist...");
    const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const requestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + spotifyAccessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistInput,
        description: "",
        public: false,
      }),
    };
    const response = await fetch(createPlaylistEndpoint, requestInit);
    console.log("Status code (create playlist): ", response.status);
    const data = await response.json();
    console.log(data);
    return data.id;
  };

  const saveToPlaylist = async (playlistId, uris) => {
    console.log("Saving songs to playlist...");
    const saveToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const requestInit = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + spotifyAccessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: uris,
        position: 0,
      }),
    };
    console.log(requestInit);
    const response = await fetch(saveToPlaylistEndpoint, requestInit);
    console.log("Status code (add tracks): ", response.status);
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    console.log("he", playlistUris);
    if (playlistUris.length !== 0 && playlistName) {
      createPlaylist(playlistName, userSpotifyId).then((playlistId) => {
        saveToPlaylist(playlistId, playlistUris);
        setPlaylistTrack([]);
        setPlaylistName("");
      });
    }
  }, [playlistUris]);

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
              getMoreSearchResult={getMoreSearchResult}
              nextPage={nextPage}
            />
          )}
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            handlePlaylistName={namingPlaylist}
            playlistTrack={playlistTrack}
            setPlaylistTrack={setPlaylistTrack}
            displaySearchResult={displaySearchResult}
            handleSavingToPlaylist={summarizeUris}
          />
        </div>
      </main>
    </>
  );
}

export default App;
