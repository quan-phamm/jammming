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

  // Extract all the parameters from the hash section of the URL and store them as key-value pairs in an object
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

  const [playlistName, setPlaylistName] = useState("");
  const namingPlaylist = ({ target }) => setPlaylistName(target.value);

  const [playlistTrack, setPlaylistTrack] = useState([]);
  const [playlistUris, setPlaylistUris] = useState("");
  const summarizeUris = () => {
    if (!playlistName) {
      alert("Please type in a name for your playlist!");
    } else {
      setPlaylistUris(playlistTrack.map((trackObj) => trackObj.uri));
    }
  };

  // Call HTTP requests upon submitting the search input
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  const [searchData, setSearchData] = useState([]);
  const refreshSearch = () => {
    setSearchData([]);
    setDisplaySearchResult(false);
    setSearchInput("");
  };

  const [nextPage, setNextPage] = useState("");

  const getSearchResult = async () => {
    const searchEndpoint = "https://api.spotify.com/v1/search";
    const urlToFetch = `${searchEndpoint}?q=${encodeURIComponent(
      searchQuery
    )}&type=track`;
    console.log("Fetching tracks from:", urlToFetch);
    const requestInit = {
      headers: {
        Authorization: "Bearer " + spotifyAccessToken,
      },
    };
    try {
      const response = await fetch(urlToFetch, requestInit);
      const data = await response.json();
      if (response.status !== 200) {
        alert(
          `Unsuccessful request!\nStatus code: ${response.status}\nError message: ${data.error.message}`
        );
      } else {
        console.log("Fetching tracks successfuly!");
        setNextPage(data.tracks.next);
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
      }
      setDisplaySearchResult(true);
      setSearchQuery("");
    } catch (e) {
      alert(`Catching unexpected error: ${e}`);
    }
  };

  const getMoreSearchResult = async () => {
    if (!nextPage) return;
    console.log("Fetching more tracks from:", nextPage);
    try {
      const response = await fetch(nextPage, {
        headers: { Authorization: `Bearer ${spotifyAccessToken}` },
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(
          `Unsuccessful request!\nStatus code: ${response.status}\nError message: ${data.error.message}`
        );
      } else {
        console.log("Fetching more tracks successfully!");
        setNextPage(data.tracks.next);
        const items = data.tracks.items;
        setSearchData((prev) => [
          ...prev,
          ...items.map((item) => {
            const trackObject = {
              id: item.id,
              track: item.name,
              artists: item.artists.map((artistObject) => artistObject.name),
              uri: item.uri,
            };
            return trackObject;
          }),
        ]);
      }
    } catch (e) {
      alert(`Catching unexpected error: ${e}`);
    }
  };

  useEffect(() => {
    //fetch data from spotify based on search result, called everytime user click Search or submit a search input
    if (searchQuery) {
      getSearchResult();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const [userSpotifyId, setUserSpotifyId] = useState("");
  const getUserId = async (accessToken) => {
    console.log("Fetching user data...");
    const getUserProfileEndpoint = "https://api.spotify.com/v1/me";
    try {
      const response = await fetch(getUserProfileEndpoint, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(
          `Unsuccessful request!\nStatus code: ${response.status}\nError message: ${data.error.message}`
        );
      } else {
        console.log("User data is retrieved successfully!");
        return data.id;
      }
    } catch (e) {
      alert(`Catching unexpected error: ${e}`);
    }
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
    try {
      const response = await fetch(createPlaylistEndpoint, requestInit);
      const data = await response.json();
      if (response.status !== 201) {
        alert(
          `Unsuccessful request!\nStatus code: ${response.status}\nError message: ${data.error.message}`
        );
      } else {
        console.log("Playlist created with id:", data.id);
        return data.id;
      }
    } catch (e) {
      alert(`Catching unexpected error: ${e}`);
    }
  };

  const saveToPlaylist = async (playlistId, uris) => {
    console.log("Saving tracks to playlist with id:", playlistId);
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
    try {
      const response = await fetch(saveToPlaylistEndpoint, requestInit);
      const data = await response.json();
      if (response.status !== 201) {
        alert(
          `Unsuccessful request!\nStatus code: ${response.status}\nError message: ${data.error.message}`
        );
      } else {
        console.log("Tracks saved to playlist successfully!");
      }
    } catch (e) {
      alert(`Catching unexpected error: ${e}`);
    }
  };

  useEffect(() => {
    if (playlistUris.length !== 0 && playlistName) {
      createPlaylist(playlistName, userSpotifyId).then((playlistId) => {
        saveToPlaylist(playlistId, playlistUris);
        setPlaylistTrack([]);
        setPlaylistName("");
        setPlaylistUris("");
      });
    } else if (playlistUris.length === 0 && playlistName) {
      createPlaylist(playlistName, userSpotifyId);
      setPlaylistTrack([]);
      setPlaylistName("");
      setPlaylistUris("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
