import React from 'react';
import TrackCard from './TrackCard';

const SearchResult = ({ searchData }) => {
    return (
        <div className='search-result'>
            <h2>Search Result</h2>
            {searchData.map(trackObj => (
                <TrackCard key={trackObj.id} id={trackObj.id} track={trackObj.track} artists={trackObj.artist}/>
            ))}
        </div>
    );
};

export default SearchResult;