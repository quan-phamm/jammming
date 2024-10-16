import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import { getSearchResult } from './mock_data/fetchSearchQuery';

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [displaySearchResult, setDisplaySearchResult] = useState(false);

  const handleSearchInput = ({target}) => setSearchInput(target.value);

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
            artist: item.album.artists.map((artistObject) => artistObject.name)
          };
          return trackObject;  
        }));
        setSearchInput("");
        setDisplaySearchResult(true);
      })
    } else {
      setSearchData([]);
      setDisplaySearchResult(false);
    };
  }, [searchQuery]);


    return (
        <>
          <Header />
          <SearchBar searchInput={searchInput} handleSearchInput={handleSearchInput} handleSearchSubmit={handleSearchSubmit}/>
          {displaySearchResult && <SearchResult searchData={searchData}/>}
        </>
    );
};


export default App;
