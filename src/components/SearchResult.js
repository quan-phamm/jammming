import React, { useRef, useEffect } from "react";
import TrackCardForSearch from "./TrackCardForSearch";

const SearchResult = ({
  searchData,
  setPlaylistTrack,
  getMoreSearchResult,
  nextPage
}) => {
  const cardContainerRef = useRef(null);
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    const handleScroll = () => {
      console.log("User scrolling")
      const { scrollTop, scrollHeight, clientHeight } = cardContainer;
      if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 1) {
        console.log("Fetching more...");
        getMoreSearchResult();
      }
    };
    cardContainer.addEventListener("scroll", handleScroll);

    return () => {
      cardContainer.removeEventListener("scroll", handleScroll);
    };
  }, [nextPage]);

  return (
    <div className="search-result" ref={cardContainerRef}>
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
