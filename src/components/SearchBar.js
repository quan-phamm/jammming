import React from 'react';

const SearchBar = ({ searchInput, handleSearchInput, handleSearchSubmit }) => {
    return (
        <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <input id="search" type="text" value={searchInput} onChange={handleSearchInput}/>
                <button type="submit" className='search-btn'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;