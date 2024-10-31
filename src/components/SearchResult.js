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
      const { scrollTop, scrollHeight, clientHeight } = cardContainer;
      if (Math.abs(scrollHeight - clientHeight - scrollTop) <= 1) {
        getMoreSearchResult();
      }
    };
    cardContainer.addEventListener("scroll", handleScroll);

    return () => {
      cardContainer.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPage]);

  return (
    <div className="search-result" ref={cardContainerRef}>
      <h2>Search Results</h2>
      <div className="trackcard-container">
        {searchData.map((trackObj, index) => (
          <TrackCardForSearch
            setPlaylistTrack={setPlaylistTrack}
            key={`${trackObj.id}-${index}`}
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
