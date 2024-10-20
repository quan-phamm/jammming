import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import Playlist from './components/Playlist';
import { getSearchResult } from './mock_data/fetchSearchQuery';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [displaySearchResult, setDisplaySearchResult] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTrack, setPlaylistTrack] = useState([]);
  const [playlistUris, setPlaylistUris] = useState([])

  const handleSearchInput = ({target}) => setSearchInput(target.value);

  const resetSearchInput = () => setSearchInput("");

  const refreshSearch = () => {
    setSearchData([]);
    setDisplaySearchResult(false);
  }

  const namingPlaylist = ({target}) => setPlaylistName(target.value);

  // Call HTTP requests upon submitting the search input
  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    //fetch data from spotify based on search result, called everytime user click Search or submit a search input
    // jsonResponse = await response.json()
    if (searchQuery) {
      getSearchResult()
      .then((jsonResponse) => {
        const items = jsonResponse.tracks.items;
        setSearchData(items.map((item) => {
          const trackObject = {
            id: item.id,
            track: item.name,
            artists: item.artists.map((artistObject) => artistObject.name),
            uri: item.uri
          };
          return trackObject;  
        }));  
        setDisplaySearchResult(true);
      })
    }
  }, [searchQuery]);


  return (
      <>
        <Header />
        <main>
          <div className='dark-layer'></div>
          <SearchBar searchInput={searchInput} handleSearchInput={handleSearchInput} resetSearchInput={resetSearchInput} handleSearchSubmit={handleSearchSubmit} refreshSearch={refreshSearch}/>
          {displaySearchResult && <SearchResult searchData={searchData} setPlaylistTrack={setPlaylistTrack} displaySearchResult={displaySearchResult}/>}
          <Playlist playlistName={playlistName} setPlaylistName={setPlaylistName} handlePlaylistName={namingPlaylist} playlistTrack={playlistTrack} setPlaylistTrack={setPlaylistTrack} setPlaylistUris={setPlaylistUris}/>
        </main>
      </>
  );
};


export default App;
