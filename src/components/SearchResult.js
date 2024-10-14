import React from 'react';

const SearchResult = ({ searchData }) => {
    const trackLists = searchData.map(trackObj => {
        return (
            <ul className='track' key={trackObj.id}>
                <li>{trackObj.track}</li>
                <li>{trackObj.artist.join(", ")}</li>
            </ul>
        )
    });

    return (
        <div className='search-result'>
            {trackLists}
        </div>
    );
};

export default SearchResult;