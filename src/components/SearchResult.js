import React from 'react';

const SearchResult = ({ searchData }) => {
    return (
        <div className='search-result'>
            {searchData.map(trackObj => (
                <div className='track' key={trackObj.id}>
                    <p className='track-name'>{trackObj.track}</p>
                    <p className='artists'>{trackObj.artist.join(", ")}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResult;