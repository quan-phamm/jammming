import React from "react";
import TrackCardForSearch from "./TrackCardForSearch";

const SearchResult = ({ searchData, setPlaylistTrack }) => {
  return (
    <div className="search-result">
      <h2>Search Results</h2>
      <div className="trackcard-container">
        {searchData.map((trackObj) => (
          <TrackCardForSearch
            setPlaylistTrack={setPlaylistTrack}
            key={trackObj.id}
            id={trackObj.id}
            track={trackObj.track}
            artists={trackObj.artists}
            uri={trackObj.uri}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
