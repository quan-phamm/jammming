import React from 'react';

const SearchResult = ({ searchData }) => {
    const trackLists = searchData.map(trackObj => {
        return (
            <div className='track' key={trackObj.id}>
                <p className='track-name'>{trackObj.track}</p>
                <p className='artists'>{trackObj.artist.join(", ")}</p>
            </div>
        )
    });

    return (
        <div className='search-result'>
            {trackLists}
        </div>
    );
};

export default SearchResult;