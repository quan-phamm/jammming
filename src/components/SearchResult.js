import React from 'react';
import TrackCardForSearch from './TrackCardForSearch';

const SearchResult = ({ searchData, setPlaylistTrack }) => {
    return (
        <div className='search-result'>
            <h2>Search Result</h2>
            {searchData.map(trackObj => (
                <TrackCardForSearch setPlaylistTrack={setPlaylistTrack} key={trackObj.id} id={trackObj.id} track={trackObj.track} artists={trackObj.artist}/>
            ))}
        </div>
    );
};

export default SearchResult;