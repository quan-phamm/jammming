import React from 'react';
import TrackCardForSearch from './TrackCardForSearch';

const SearchResult = ({ searchData, setPlaylistTrack, displaySearchResult }) => {
    return (
        <div className='search-result'>
            {displaySearchResult && <h2>Search Result</h2>}
            {searchData.map(trackObj => (
                <TrackCardForSearch setPlaylistTrack={setPlaylistTrack} key={trackObj.id} id={trackObj.id} track={trackObj.track} artists={trackObj.artists}/>
            ))}
        </div>
    );
};

export default SearchResult;