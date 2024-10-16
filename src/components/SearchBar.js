import React from 'react';

const SearchBar = ({ searchInput, handleSearchInput, handleSearchSubmit }) => {
    return (
        <div className="search-bar">
            <form onSubmit={handleSearchSubmit}>
                <input id="search" type="text" name="search" aria-label='Search' placeholder='What do you want to search?' value={searchInput} onChange={handleSearchInput}/>
                <button type="submit" className='search-btn'>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;